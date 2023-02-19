import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  AllocatedResourceTypeDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyResources,
  DummySeniorityLevels,
} from 'src/app/types/dummy-data';

import {
  autoCompleteResourceNameValidator,
  ResourceSelectionComponent,
} from './resource-selection.component';

describe('ResourceSelectionComponent', () => {
  let component: ResourceSelectionComponent;
  let fixture: ComponentFixture<ResourceSelectionComponent>;
  let resources: ResourceListType[];
  let allocationFormGroup = new FormGroup({
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
  let resourceToEdit: AllocatedResourceTypeDTO = DummyAllocatedResources[0];
  let seniorityLevels: string[] = DummySeniorityLevels;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceSelectionComponent],
      imports: [MatAutocompleteModule],
    }).compileComponents();

    resources = [...DummyResources];

    fixture = TestBed.createComponent(ResourceSelectionComponent);
    component = fixture.componentInstance;
    component.allocationFormGroup = allocationFormGroup;
    component.seniorityLevels = seniorityLevels;
    spyOn(component.formGroupEmitter, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.seniorityLevels).toEqual(seniorityLevels);
    expect(component.updateResourceMode).toEqual(false);
    expect(component.resourceToEdit).toBeUndefined;
  });

  it('should emit form group on init', fakeAsync(() => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const resourceInput: HTMLInputElement =
      hostElement.querySelector('#resource')!;
    resourceInput.value = 'John Bowers';
    resourceInput.dispatchEvent(new Event('input'));
    component.allocationFormGroup.controls['resource_name'].setValue(
      'John Bowers'
    );

    fixture.detectChanges();
    tick(250);

    expect(component.allocationFormGroup.controls['resource_name'].value).toBe(
      'John Bowers'
    );
    expect(component.formGroupEmitter.emit).toHaveBeenCalled();
  }));

  it('should update form group with resourceToEdit details', () => {
    component.resourceToEdit = resourceToEdit;
    component.ngOnInit();
    expect(component.allocationFormGroup.controls['resource_name'].value).toBe(
      resourceToEdit.resource_name
    );
    expect(component.allocationFormGroup.controls['role'].value).toBe(
      resourceToEdit.role
    );
    expect(component.allocationFormGroup.controls['seniorityLevel'].value).toBe(
      resourceToEdit.seniority
    );
  });

  it('resource auto complete validator success', () => {
    let control = { value: 'John Bowers' };
    let result = autoCompleteResourceNameValidator(resources)(
      control as AbstractControl
    );
    expect(result).toBeNull();
  });

  it('resource auto complete validator error', () => {
    let control = { value: 'Scott Mctominay' };
    let result = autoCompleteResourceNameValidator(resources)(
      control as AbstractControl
    );
    expect(result).toEqual({
      invalidAutoCompleteResourceName: { value: control.value },
    });
  });

  it('should filter resource based on seniority - JUNIOR', () => {
    resources[0].selected = false;
    component.resources = resources;
    let expectedResult: ResourceListType[] = [
      {
        resource_name: 'John Bowers',
        resource_email: 'johnbowers@accolitedigital.com',
        resource_id: 1,
        selected: false,
      },
    ];

    component.allocationFormGroup.controls['seniorityLevel'].setValue('JUNIOR');

    let result: ResourceListType[] = component.filterResource('John');

    expect(result).toEqual(expectedResult);
  });

  it('should notify display skill', () => {
    component.updateResourceMode = true;
    let selectedResource: ResourceListType = DummyResources[0];
    spyOn(component.displaySkillEmitter, 'emit');
    component.getSkills(selectedResource);
    expect(component.displaySkillEmitter.emit).toHaveBeenCalledWith(
      selectedResource
    );
  });
});
