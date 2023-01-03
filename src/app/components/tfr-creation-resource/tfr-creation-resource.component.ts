import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResourceListType, AllocatedResourceType } from 'src/app/types/types';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function autocompleteObjectValidator(
  validOptions: Array<ResourceListType>
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (validOptions.find((e) => e.resource_name === control.value)) {
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
  projectId: number = 1;
  resourceFormGroup!: FormGroup;
  resources!: ResourceListType[];
  roles!: string[];
  filteredResourceOption!: Observable<ResourceListType[]>;
  filteredRoleOption!: Observable<string[]>;
  allocatedResources: AllocatedResourceType[] = [];
  @Output() nextStepEmitter = new EventEmitter<boolean>();

  constructor(private resourceService: ResourceService) {}

  public validation_msgs = {
    resource_name: [
      {
        type: 'invalidAutocompleteObject',
        message:
          'Resource name not recognized. Click one of the autocomplete options.',
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
    this.resources = this.resourceService.getAllResources();
    this.roles = this.resourceService.getAllRoles();
    this.resourceFormGroup = new FormGroup({
      resource_name: new FormControl('', {
        validators: [
          autocompleteObjectValidator(this.resources),
          Validators.required,
        ],
      }),
      role: new FormControl('', {
        validators: [
          autocompleteStringValidator(this.roles),
          Validators.required,
        ],
      }),
    });
    this.filteredRoleOption = this.resourceFormGroup.controls[
      'role'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterRole(value || ''))
    );

    this.filteredResourceOption = this.resourceFormGroup.controls[
      'resource_name'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterResource(value || ''))
    );
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
        resource.resource_name.toLowerCase().includes(filterValue)
      );
  }

  addResource(resource_name: string, role: string) {
    const index = this.resources.findIndex(
      (resource) => resource.resource_name === resource_name
    );
    this.resources[index].selected = true;

    const allocatedResource: AllocatedResourceType = {
      project_id: this.projectId,
      resource_id: this.resources[index].resource_id,
      resource_name: resource_name,
      role: role,
    };

    this.allocatedResources.push(allocatedResource);

    this.resetFormGroup();
  }

  removeResource(resource_id: number) {
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
    this.resourceFormGroup.setValue({ resource_name: '', role: '' });
    this.resourceFormGroup.controls['resource_name'].setErrors(null);
    this.resourceFormGroup.controls['role'].setErrors(null);
  }

  triggerNextStep() {
    // console.log("save to database");
    // console.log(this.allocatedResources);
    this.nextStepEmitter.emit(true);
    console.log('entered');
  }

  displayInfo(allocatedResource: AllocatedResourceType) {
    console.log(allocatedResource.resource_name);
    console.log(allocatedResource.role);
  }
}
