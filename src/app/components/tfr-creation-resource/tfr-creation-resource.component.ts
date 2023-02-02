import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  AllocatedResourceTypeDTO,
  ProjectResourceDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';

/*
  Custom validator for the auto complete functionality of the 
  resource name input field. It validates that the inserted value
  in the input field is present in the list of available resource 
  names.

  Returns invalidAutoCompleteResourceName as error if the inserted value is 
  not present in the list.
*/
export function autoCompleteResourceNameValidator(
  validOptions: ResourceListType[]
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.find((e) => e.resource_name === control.value)) {
      return null; /* valid option selected */
    }
    return { invalidAutoCompleteResourceName: { value: control.value } };
  };
}

@Component({
  selector: 'app-tfr-creation-resource',
  templateUrl: './tfr-creation-resource.component.html',
  styleUrls: ['./tfr-creation-resource.component.scss'],
})
export class TfrCreationResourceComponent implements OnInit {
  constructor(
    protected resourceService: ResourceService,
    protected tfrManagementService: TfrManagementService,
    private matDialog: MatDialog
  ) {}

  resourceFormGroup!: FormGroup;
  resourcesCountFormGroup!: FormGroup;
  resourcesCount: number = 1;
  resources!: ResourceListType[];
  seniorityLevels!: string[];
  resourcesFilterBySeniority!: ResourceListType[];
  filteredResourceOption!: Observable<ResourceListType[]>;
  filteredRoleOption!: Observable<string[]>;
  allocatedResources: AllocatedResourceTypeDTO[] = [];
  savedAllocatedResource: ProjectResourceDTO[] = [];
  resourceDetailsUpdated: boolean = false;
  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  getResourceNameObserver = {
    next: (data: AllocatedResourceTypeDTO[]) => {
      this.tfrManagementService.projectResourcesWithNames = data;
      this.allocatedResources = [
        ...this.tfrManagementService.getProjectResourcesWithNames,
      ];

      this.resources.map((resource) => (resource.selected = false));

      this.allocatedResources.forEach((allocatedResource) => {
        let indexOfResource = this.resources.findIndex(
          (val) =>
            val.resource_id === allocatedResource.resource_id &&
            !allocatedResource.is_deleted
        );
        if (indexOfResource !== -1) {
          this.resources[indexOfResource].selected = true;
        }
      });
      this.resourcesCount =
        this.tfrManagementService.project?.resources_count === 0
          ? 1
          : this.tfrManagementService.project?.resources_count!;

      this.resetFormGroup();
      this.resourceDetailsUpdated = false;
    },
  };

  /*
    object that holds the corresponding error messages for the 
    resource form group.
  */
  public validation_msgs = {
    resource_name: [
      {
        type: 'invalidAutoCompleteResourceName',
        message:
          'Resource name not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'Resource is required.' },
    ],
    role: [{ type: 'required', message: 'Role is required.' }],
    seniorityLevel: [
      { type: 'required', message: 'Seniority Level is required.' },
    ],
  };

  ngOnInit(): void {
    this.resourceFormGroup = new FormGroup({
      resources_count: new FormControl('', {
        validators: [Validators.required],
      }),
      resource_name: new FormControl('', {
        validators: [Validators.required],
      }),
      seniorityLevel: new FormControl('', {
        validators: [Validators.required],
      }),
      role: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    if (this.tfrManagementService.project?.resources_count === 0) {
      this.resourceFormGroup.get('resources_count')?.setValue('');
      this.resourcesCount = 1;
    } else {
      this.resourceFormGroup
        .get('resources_count')
        ?.setValue(this.tfrManagementService.project?.resources_count);
      this.resourcesCount = this.tfrManagementService.project?.resources_count!;
    }

    this.addEventListerner();

    /*
      API call to retrieve all the seniority levels that a resource can be
    */
    this.resourceService.getAllSeniorityLevels().subscribe((data: string[]) => {
      this.seniorityLevels = data;
    });

    /*
      API call to the server to obtain a list of all the available resources 
      present in the database. 
      
      The resource object is a DTO that holds the resources' names, name, id, 
      and a boolean indicating whether the resource has been selected yet for 
      this project. Upon receiving the payload, this boolean is FALSE for all 
      resources
    */
    this.resourceService
      .getAllResources()
      .subscribe((data: ResourceListType[]) => {
        this.resources = data;
        this.resourcesFilterBySeniority = data;

        /*
          Adding the custom validator for the auto complete functionality 
          for the resource name input field.
        */
        this.resourceFormGroup.controls['resource_name'].addValidators([
          autoCompleteResourceNameValidator(this.resources),
        ]);

        /*
          Event listener when there is a letter inserted in the resource name
          input field. The list of options showed to the user gets updated based
          on the letters he is inserting.
        */
        this.filteredResourceOption = this.resourceFormGroup.controls[
          'resource_name'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this.filterResource(value || ''))
        );

        /*
          this variable holds the lsit of the resources that are associated
          with the current project. Each value of the list is the current 
          project_id, resource_id and the resource associated role for this 
          project
        */
        let temp: ProjectResourceDTO[] | undefined =
          this.tfrManagementService.getProjectResources;

        /*
          If this temp variable is undefined, this means that the user is 
          creating a new project. 

          If this temp variable is NOT undefined, then this means that the 
          user is editing an existing project
        */
        if (temp !== undefined) {
          this.savedAllocatedResource = temp;

          /*
            Since this existing project has already some resources allocated 
            to it, the current allocated resource list (initially empty) 
            should be populated with these values and the resources' selected 
            value in resources object should be set to TRUE so that 
            the auto complete resource name input field will
            not display these already allocated resources.
          */
          this.updateResourceList();

          /*
            Updating the current service object with the allocated resources
            object which contains project_id, resources' id, name, name, role.
          */
          this.tfrManagementService.setProjectResourcesWithNames(
            this.allocatedResources
          );

          /*
            Since some resources have already been allocated, need to emit
            this to the parent component (aka stepper component).
          */
          // this.stepCompletedEmitter.emit(true);
        }
      });
  }

  /*
    This function takes in the value that the user has inserted in the 
    resource name input field and returns the list of resource names
    that are related to the inserted string.
  */
  public filterResource(value: string): ResourceListType[] {
    const filterValue = value.toLowerCase();

    return this.resources
      .filter((resource) => !resource.selected)
      .filter((resource) =>
        resource.resource_name.toLowerCase().includes(filterValue)
      );
  }

  /*
    Adds the mapping between a resource and the current project with a 
    corresponding role.
  */
  addResource(resource_name: string, role: string, seniority: string) {
    /*
      An update API call will be required to update the project-resource database.
    */
    this.resourceDetailsUpdated = true;

    /*
      Find the index of the resource_name inserted in the input field in the
      list of ALL the resources of the database.
      
      Use case: To obtain all the required details about this resource. (aka name,
      name, selected).
    */
    const index = this.resources.findIndex(
      (resource) => resource.resource_name === resource_name
    );
    this.resources[index].selected = true;

    /*
      Creating a combined object (of AllocatedResourceType) to store the 
      added resource with its corresponding details.
    */
    const allocatedResource: AllocatedResourceTypeDTO = {
      project_id: this.tfrManagementService.getProjectId as number,
      resource_id: this.resources[index].resource_id,
      resource_name: resource_name,
      resource_email: this.resources[index].resource_email,
      is_deleted: false,
      seniority: seniority,
      role: role,
    };

    const existingAllocatedResourceIndex = this.allocatedResources.findIndex(
      (resource) =>
        resource.resource_id === allocatedResource.resource_id &&
        resource.role === allocatedResource.role
    );

    if (existingAllocatedResourceIndex !== -1) {
      this.allocatedResources[existingAllocatedResourceIndex].is_deleted =
        false;
    } else {
      this.allocatedResources.push(allocatedResource);
    }

    console.log(this.allocatedResources);
    console.log(this.resources);

    this.resetFormGroup();
  }

  /*
    Removing the mapping between a project and a resource.
  */
  removeResource(removedResource: AllocatedResourceTypeDTO) {
    /*
      An update API call will be required to update the project-resource database.
    */
    this.resourceDetailsUpdated = true;

    const indexForResourcesArr = this.resources.findIndex(
      (resource) => resource.resource_id === removedResource.resource_id
    );
    this.resources[indexForResourcesArr].selected = false;
    const indexForAllocatedResourceArr = this.allocatedResources.findIndex(
      (resource) =>
        resource.resource_id === removedResource.resource_id &&
        resource.role === removedResource.role
    );
    // this.allocatedResources.splice(indexForAllocatedResourceArr, 1);
    this.allocatedResources[indexForAllocatedResourceArr].is_deleted = true;

    this.resetFormGroup();
  }

  resetFormGroup() {
    this.resourceFormGroup.setValue(
      {
        resources_count: this.resourcesCount,
        resource_name: '',
        role: '',
        seniorityLevel: '',
      },
      { emitEvent: false }
    );
    this.addEventListerner();

    this.resourceFormGroup.controls['resource_name'].setErrors(null);
    this.resourceFormGroup.controls['role'].setErrors(null);
    this.resourceFormGroup.controls['seniorityLevel'].setErrors(null);
  }

  /*
    Populates the current allocated resource list (initially empty) 
    with resources' values for this existing project and the
    resources' selected value in resources object is set to TRUE so that 
    the auto complete resource name input field will not display 
    these already allocated resources.
  */
  updateResourceList() {
    this.savedAllocatedResource.forEach((resource) => {
      let indexOfResource = this.resources.findIndex(
        (val) => val.resource_id === resource.resource_id
      );

      if (!resource.is_deleted) {
        this.resources[indexOfResource].selected = true;
      }

      const allocatedResource: AllocatedResourceTypeDTO = {
        project_id: resource.project_id,
        resource_id: resource.resource_id,
        resource_name: this.resources[indexOfResource].resource_name,
        resource_email: this.resources[indexOfResource].resource_email,
        is_deleted: resource.is_deleted,
        seniority: resource.seniority,
        role: resource.role,
      };

      this.allocatedResources.push(allocatedResource);
    });
  }

  /*
    Changes the step of the stepper
    forward = true => Go to next step
    forward = false => Go to previous step
  */
  triggerStep(forward: boolean) {
    if (this.resourceDetailsUpdated) {
      this.showDialog(forward);
    } else {
      this.nextStep(forward);
    }
  }

  /*
    Asks the user whether he wants to save the changes to database
    forward = true => Go to next step
    forward = false => Go to previous step
  */
  showDialog(forward: boolean) {
    let dialogRef = this.matDialog.open(TfrCreationDialogComponent, {
      data: {
        title: 'Discard Changes',
        content: 'Would you like to discard your changes and continue?',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'true') {
        /* User wants to discard changes */
        this.nextStep(forward);

        /* Reset the allocated resources to previous state in database*/
        this.resetResources();
      }
    });
  }

  nextStep(forward: boolean) {
    this.stepCompletedEmitter.emit(forward);
    this.nextStepEmitter.emit(forward);
  }

  /* 
    Reset the allocated resources to previous state in database
  */
  resetResources() {
    this.tfrManagementService
      .getResourcesNamesByProjectIdFromDatabase(
        this.tfrManagementService.getProjectId as Number
      )
      .subscribe(this.getResourceNameObserver);
  }

  saveToDatabase() {
    this.tfrManagementService.setProjectResourcesWithNames(
      this.allocatedResources
    );
    this.tfrManagementService.setResourcesCount(this.resourcesCount);
    this.tfrManagementService.updateProjectToResourceMapping();
    this.resourceDetailsUpdated = false;
  }

  addEventListerner() {
    this.resourceFormGroup
      .get('resources_count')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((val: number) => {
        this.resourcesCount = val;
        this.resourceDetailsUpdated = true;
      });
  }
}
