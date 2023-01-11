import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import {
  ResourceListType,
  AllocatedResourceType,
  ProjectResource,
} from 'src/app/types/types';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { MatDialog } from '@angular/material/dialog';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';

/*
  Custom validator for the auto complete functionality of the 
  resource email input field. It validates that the inserted value
  in the input field is present in the list of available resource 
  emails.

  Returns invalidAutoCompleteResourceEmail as error if the inserted value is 
  not present in the list.
*/
function autoCompleteResourceEmailValidator(
  validOptions: Array<ResourceListType>
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.find((e) => e.resource_email === control.value)) {
      return null; /* valid option selected */
    }
    return { invalidAutoCompleteResourceEmail: { value: control.value } };
  };
}

/*
  Custom validator for the auto complete functionality of the 
  role input field. It validates that the inserted value
  in the input field is present in the list of available roles.

  Returns invalidAutoCompleteRole as error if the inserted value is 
  not present in the list.
*/
function autoCompleteRoleValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null; /* valid option selected */
    }
    return { invalidAutoCompleteRole: { value: control.value } };
  };
}

@Component({
  selector: 'app-tfr-creation-resource',
  templateUrl: './tfr-creation-resource.component.html',
  styleUrls: ['./tfr-creation-resource.component.scss'],
})
export class TfrCreationResourceComponent implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private tfrManagementService: TfrManagementService,
    private matDialog: MatDialog
  ) {}

  resourceFormGroup!: FormGroup;
  resources!: ResourceListType[];
  roles!: string[];
  filteredResourceOption!: Observable<ResourceListType[]>;
  filteredRoleOption!: Observable<string[]>;
  allocatedResources: AllocatedResourceType[] = [];
  savedAllocatedResource: ProjectResource[] = [];
  resourceListUpdated: boolean = false;
  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  /*
    object that holds the corresponding error messages for the 
    resource form group.
  */
  public validation_msgs = {
    resource_email: [
      {
        type: 'invalidAutoCompleteResourceEmail',
        message:
          'Resource email not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'Resource is required.' },
    ],
    role: [
      {
        type: 'invalidAutoCompleteRole',
        message: 'Role not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'Role is required.' },
    ],
  };

  ngOnInit(): void {
    this.resourceFormGroup = new FormGroup({
      resource_email: new FormControl('', {
        validators: [Validators.required],
      }),
      role: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    /*
      API call to the server to obtain a list of all the roles that a 
      resource can be assigned to in a project.
    */
    this.resourceService.getAllRoles().subscribe((data: string[]) => {
      /*
        The list of roles obtained from the database contains underscores. 
        
        The service function called returns the list of roles with no 
        underscores which look better on display.
      */
      this.roles = this.resourceService.convertRoleEnum(data);

      /*
        Adding the custom validator for the auto complete functionality 
        for the role input field.
      */
      this.resourceFormGroup.controls['role'].addValidators([
        autoCompleteRoleValidator(this.roles),
      ]);

      /*
        Event listener when there is a letter inserted in the role input 
        field. The list of options showed to the user gets updated based
        on the letters he is inserting.
      */
      this.filteredRoleOption = this.resourceFormGroup.controls[
        'role'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filterRole(value || ''))
      );
    });

    /*
      API call to the server to obtain a list of all the available resources 
      present in the database. 
      
      The resource object is a DTO that holds the resources' names, email, id, 
      and a boolean indicating whether the resource has been selected yet for 
      this project. Upon receiving the payload, this boolean is FALSE for all 
      resources
    */
    this.resourceService
      .getAllResources()
      .subscribe((data: ResourceListType[]) => {
        this.resources = data;

        /*
          Adding the custom validator for the auto complete functionality 
          for the resource email input field.
        */
        this.resourceFormGroup.controls['resource_email'].addValidators([
          autoCompleteResourceEmailValidator(this.resources),
        ]);

        /*
          Event listener when there is a letter inserted in the resource email
          input field. The list of options showed to the user gets updated based
          on the letters he is inserting.
        */
        this.filteredResourceOption = this.resourceFormGroup.controls[
          'resource_email'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filterResource(value || ''))
        );

        /*
          this variable holds the lsit of the resources that are associated
          with the current project. Each value of the list is the current 
          project_id, resource_id and the resource associated role for this 
          project
        */
        let temp: ProjectResource[] | undefined =
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
            the auto complete resource email input field will
            not display these already allocated resources.
          */
          this.updateResourceList();

          /*
            Updating the current service object with the allocated resources
            object which contains project_id, resources' id, name, email, role.
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
    role input field and returns the list of roles that are related to 
    the inserted string.
  */
  private _filterRole(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter((role) =>
      role.toLowerCase().includes(filterValue)
    );
  }

  /*
    This function takes in the value that the user has inserted in the 
    resource email input field and returns the list of resource emails
    that are related to the inserted string.
  */
  private _filterResource(value: string): ResourceListType[] {
    const filterValue = value.toLowerCase();
    return this.resources
      .filter((resource) => !resource.selected)
      .filter((resource) =>
        resource.resource_email.toLowerCase().includes(filterValue)
      );
  }

  /*
    Adds the mapping between a resource and the current project with a 
    corresponding role.
  */
  addResource(resource_email: string, role: string) {
    /*
      An update API call will be required to update the project-resource database.
    */
    this.resourceListUpdated = true;

    /*
      Find the index of the resource_email inserted in the input field in the
      list of ALL the resources of the database.
      
      Use case: To obtain all the required details about this resource. (aka name,
      email, selected).
    */
    const index = this.resources.findIndex(
      (resource) => resource.resource_email === resource_email
    );
    this.resources[index].selected = true;

    /*
      Creating a combined object (of AllocatedResourceType) to store the 
      added resource with its corresponding details.
    */
    const allocatedResource: AllocatedResourceType = {
      project_id: this.tfrManagementService.getProjectId as number,
      resource_id: this.resources[index].resource_id,
      resource_name: this.resources[index].resource_name,
      resource_email: resource_email,
      role: role,
    };

    this.allocatedResources.push(allocatedResource);

    this.resetFormGroup();
  }

  /*
    Removing the mapping between a project and a resource.
  */
  removeResource(resource_id: number) {
    /*
      An update API call will be required to update the project-resource database.
    */
    this.resourceListUpdated = true;

    const indexForResourcesArr = this.resources.findIndex(
      (resource) => resource.resource_id === resource_id
    );
    this.resources[indexForResourcesArr].selected = false;
    const indexForAllocatedResourceArr = this.allocatedResources.findIndex(
      (resource) => resource.resource_id === resource_id
    );
    this.allocatedResources.splice(indexForAllocatedResourceArr, 1);

    this.resetFormGroup();
  }

  resetFormGroup() {
    this.resourceFormGroup.setValue({ resource_email: '', role: '' });
    this.resourceFormGroup.controls['resource_email'].setErrors(null);
    this.resourceFormGroup.controls['role'].setErrors(null);
  }

  /*
    Populates the current allocated resource list (initially empty) 
    with resources' values for this existing project and the
    resources' selected value in resources object is set to TRUE so that 
    the auto complete resource email input field will not display 
    these already allocated resources.
  */
  updateResourceList() {
    this.savedAllocatedResource.forEach((resource) => {
      let indexOfResource = this.resources.findIndex(
        (val) => val.resource_id === resource.resource_id
      );

      this.resources[indexOfResource].selected = true;
      const allocatedResource: AllocatedResourceType = {
        project_id: resource.project_id,
        resource_id: resource.resource_id,
        resource_name: this.resources[indexOfResource].resource_name,
        resource_email: this.resources[indexOfResource].resource_email,
        role: this.resourceService.getAssociatedCleanRole(resource.role),
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
    if (this.resourceListUpdated) {
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
    let dialogRef = this.matDialog.open(TfrCreationDialogComponent);
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
    this.allocatedResources =
      this.tfrManagementService.getProjectResourcesWithNames;
    this.allocatedResources.forEach((allocatedResource) => {
      let indexOfResource = this.resources.findIndex(
        (val) => val.resource_id === allocatedResource.resource_id
      );
      this.resources[indexOfResource].selected = true;
    });
    this.resourceListUpdated = false;
  }

  saveToDatabase() {
    this.tfrManagementService.setProjectResourcesWithNames(
      this.allocatedResources
    );
    this.tfrManagementService.updateProjectToResourceMapping();
    this.resourceListUpdated = false;
  }
}
