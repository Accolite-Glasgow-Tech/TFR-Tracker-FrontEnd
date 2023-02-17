import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval, map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import {
  AddResource,
  AllocatedResourceTypeDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-resource-selection',
  templateUrl: './resource-selection.component.html',
  styleUrls: ['./resource-selection.component.scss'],
})
export class ResourceSelectionComponent implements OnInit {
  allocationFormGroup!: FormGroup;
  currentResourceName!: string;
  filteredResourceOption!: Observable<ResourceListType[]>;
  @Input() updateResourceMode: boolean = false;
  @Input() seniorityLevels: string[] = [];
  @Input() resources: ResourceListType[] = [];
  @Input() resourceCountValid: boolean = true;
  @Input() resourceToEdit!: AllocatedResourceTypeDTO;
  @Output() displaySkillEmitter = new EventEmitter<ResourceListType>();
  @Output() addResourceEmitter = new EventEmitter<AddResource>();
  @Output() formGroupEmitter = new EventEmitter<FormGroup>();

  validation_msgs = {
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

  constructor(protected apiService: ApiService) {}

  ngOnInit() {
    this.allocationFormGroup = new FormGroup({
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
    if (this.resourceToEdit) {
      this.allocationFormGroup.controls['resource_name'].setValue(
        this.resourceToEdit.resource_name
      );
      this.allocationFormGroup.controls['role'].setValue(
        this.resourceToEdit.role
      );
      this.allocationFormGroup.controls['seniorityLevel'].setValue(
        this.resourceToEdit.seniority
      );
    }
    this.formGroupEmitter.emit(this.allocationFormGroup);

    this.filteredResourceOption = this.allocationFormGroup.controls[
      'resource_name'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this.filterResource(value || ''))
    );

    this.allocationFormGroup.valueChanges
      .pipe(debounce(() => interval(250)))
      .subscribe(() => {
        this.formGroupEmitter.emit(this.allocationFormGroup);
      });
  }

  filterResource(value: string): ResourceListType[] {
    const filterValue = value.toLowerCase();
    return this.resources
      .filter((resource) => !resource.selected)
      .filter((resource) =>
        resource.resource_name.toLowerCase().includes(filterValue)
      );
  }

  getSkills(selectedResource: ResourceListType) {
    if (this.updateResourceMode)
      this.displaySkillEmitter.emit(selectedResource);
  }
}
