import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  AddResource,
  UpdateResourceDialogContent,
} from 'src/app/shared/interfaces';
import { DummyUpdateResourceDialogContent } from 'src/app/types/dummy-data';

import { UpdateResourceDialogComponent } from './update-resource-dialog.component';

describe('UpdateResourceDialogComponent', () => {
  let component: UpdateResourceDialogComponent;
  let fixture: ComponentFixture<UpdateResourceDialogComponent>;
  let updateResourceDialogContent: UpdateResourceDialogContent =
    DummyUpdateResourceDialogContent;
  let allocationFormGroup = new FormGroup({
    resource_name: new FormControl('John Bowers', {
      validators: [Validators.required],
    }),
    seniorityLevel: new FormControl('ADVANCED', {
      validators: [Validators.required],
    }),
    role: new FormControl('Team Lead', {
      validators: [Validators.required],
    }),
  });
  let matDialogRefSpy: MatDialogRef<any, any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateResourceDialogComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: updateResourceDialogContent,
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateResourceDialogComponent);
    component = fixture.componentInstance;
    matDialogRefSpy = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close on esc button', () => {
    component.onEsc();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it('should set allocation form group on value change', () => {
    component.valueChanges(allocationFormGroup);
    expect(component.allocationFormGroup).toEqual(allocationFormGroup);
  });

  it('should return updated resource', () => {
    component.allocationFormGroup = allocationFormGroup;
    let expectedResult: AddResource = {
      resource_name: 'John Bowers',
      role: 'Team Lead',
      seniority: 'ADVANCED',
    };
    expect(component.updateResource()).toEqual(expectedResult);
  });
});
