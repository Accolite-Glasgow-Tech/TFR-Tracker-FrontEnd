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

function autocompleteObjectValidator(
  validOptions: Array<ResourceListType>
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.find((e) => e.resource_email === control.value)) {
      return null; /* valid option selected */
    }
    return { invalidAutocompleteObject: { value: control.value } };
  };
}

function autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.indexOf(control.value) !== -1) {
      return null; /* valid option selected */
    }
    return { invalidAutocompleteString: { value: control.value } };
  };
}

@Component({
  selector: 'app-tfr-creation-resource',
  templateUrl: './tfr-creation-resource.component.html',
  styleUrls: ['./tfr-creation-resource.component.scss'],
})
export class TfrCreationResourceComponent implements OnInit {
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

  constructor(
    private resourceService: ResourceService,
    private tfrManagementService: TfrManagementService
  ) {}

  public validation_msgs = {
    resource_email: [
      {
        type: 'invalidAutocompleteObject',
        message:
          'Resource email not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'Resource is required.' },
    ],
    role: [
      {
        type: 'invalidAutocompleteString',
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

    this.resourceService
      .getAllResources()
      .subscribe((data: ResourceListType[]) => {
        this.resources = data;
        this.resourceFormGroup.controls['resource_email'].addValidators([
          autocompleteObjectValidator(this.resources),
        ]);

        this.filteredResourceOption = this.resourceFormGroup.controls[
          'resource_email'
        ].valueChanges.pipe(
          startWith(''),
          map((value) => this._filterResource(value || ''))
        );

        let temp: ProjectResource[] | undefined =
          this.tfrManagementService.getProjectResources;
        if (temp !== undefined) {
          this.savedAllocatedResource = temp;
          this.updateResourceList();
          this.tfrManagementService.setProjectResourcesWithNames(
            this.allocatedResources
          );
          this.stepCompletedEmitter.emit(true);
        }
      });

    this.resourceService.getAllRoles().subscribe((data: string[]) => {
      this.roles = data;
      this.resourceFormGroup.controls['role'].addValidators([
        autocompleteStringValidator(this.roles),
      ]);

      this.filteredRoleOption = this.resourceFormGroup.controls[
        'role'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filterRole(value || ''))
      );
    });
  }

  private _filterRole(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.roles.filter((role) =>
      role.toLowerCase().includes(filterValue)
    );
  }

  private _filterResource(value: string): ResourceListType[] {
    const filterValue = value.toLowerCase();
    return this.resources
      .filter((resource) => !resource.selected)
      .filter((resource) =>
        resource.resource_email.toLowerCase().includes(filterValue)
      );
  }

  addResource(resource_email: string, role: string) {
    this.resourceListUpdated = true;
    const index = this.resources.findIndex(
      (resource) => resource.resource_email === resource_email
    );
    this.resources[index].selected = true;

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

  removeResource(resource_id: number) {
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
        role: resource.role,
      };

      this.allocatedResources.push(allocatedResource);
    });
  }

  triggerNextStep() {
    if (this.resourceListUpdated) {
      this.tfrManagementService.setProjectResourcesWithNames(
        this.allocatedResources
      );
      this.tfrManagementService.updateProjectToResourceMapping();
      this.resourceListUpdated = false;
    }
    this.nextStepEmitter.emit(true);
  }
}
