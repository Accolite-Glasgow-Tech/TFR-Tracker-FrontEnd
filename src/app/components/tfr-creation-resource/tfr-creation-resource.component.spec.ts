import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  AllocatedResourceTypeDTO,
  dialogContent,
  ProjectResourceDTO,
  ResourceListType,
  ResourceSkillDTO,
} from 'src/app/shared/interfaces';
import { DummyAllocatedResources } from 'src/app/types/dummy-data';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';
import {
  autoCompleteResourceNameValidator,
  TfrCreationResourceComponent,
} from './tfr-creation-resource.component';

export class MatDialogMock {
  open(component: TfrCreationDialogComponent) {
    return {
      afterClosed: () => of('true'),
    };
  }
}

describe('TfrCreationResourceComponent', () => {
  let component: TfrCreationResourceComponent;
  let fixture: ComponentFixture<TfrCreationResourceComponent>;
  let seniorityLevels: string[];
  let dummyAllocatedResource: AllocatedResourceTypeDTO[];
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let projectResources: ProjectResourceDTO[];
  let resources: ResourceListType[];
  let projectResourcesWithNames: AllocatedResourceTypeDTO[];
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({
    afterClosed: of({}),
    close: null,
  });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationResourceComponent],
      imports: [MatAutocompleteModule],
      providers: [
        FormBuilder,
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj('ResourceService', [
            'resourcesWithoutDeleted',
          ]),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getAllResources',
            'getAllSeniorityLevels',
            'getResourcesNamesByProjectIdFromDatabase',
            'getSkillsByResourceId',
          ]),
        },
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj('TfrManagementService', [
            'getProjectResources',
            'setProjectResourcesWithNames',
            'getProjectId',
            'getResourcesCount',
            'getProjectResourcesWithNames',
            'updateProjectToResourceMapping',
            'setResourcesCount',
          ]),
        },
        {
          provide: MatDialog,
          useClass: MatDialogMock,
        },
      ],
    }).compileComponents();

    resourceServiceSpy = TestBed.inject(
      ResourceService
    ) as jasmine.SpyObj<ResourceService>;
    tfrManagementServiceSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    (tfrManagementServiceSpy as any).getResourcesCount = 3;

    resources = [
      {
        resource_name: 'John Bowers',
        resource_email: 'johnbowers@accolitedigital.com',
        resource_id: 1,
        selected: false,
      },
      {
        resource_name: 'Kimberly Gould',
        resource_email: 'kimberlygould@accolitedigital.com',
        resource_id: 3,
        selected: false,
      },
    ];
    projectResources = [
      {
        project_id: 1,
        resource_id: 1,
        role: 'SCRUM MASTER',
        seniority: 'SENIOR',
        is_deleted: false,
      },
      {
        project_id: 1,
        resource_id: 3,
        role: 'SOFTWARE DEVELOPER',
        seniority: 'JUNIOR',
        is_deleted: false,
      },
    ];

    projectResourcesWithNames = [{ ...DummyAllocatedResources[0] }];
    seniorityLevels = ['ADVANCED', 'SENIOR', 'INTERMEDIATE', 'JUNIOR'];
    dummyAllocatedResource = [...DummyAllocatedResources];

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue({
      afterClosed: () => of('true'),
    } as MatDialogRef<typeof component>);

    apiServiceSpy.getAllResources.and.returnValue(of(resources));
    apiServiceSpy.getAllSeniorityLevels.and.returnValue(of(seniorityLevels));
    resourceServiceSpy.resourcesWithoutDeleted.and.returnValue(
      dummyAllocatedResource
    );
    tfrManagementServiceSpy.setProjectResourcesWithNames.and.returnValue();
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue();
    apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.and.returnValue(
      of(dummyAllocatedResource)
    );
    (tfrManagementServiceSpy as any).getProjectResources = projectResources;
    (tfrManagementServiceSpy as any).getProjectResourcesWithNames =
      projectResourcesWithNames;

    fixture = TestBed.createComponent(TfrCreationResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialise values', () => {
    expect(component.resources).toBe(resources);
    expect(
      tfrManagementServiceSpy.setProjectResourcesWithNames.calls.count()
    ).toBe(1);
    expect(component).toBeTruthy();
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

    component.resourceFormGroup.controls['seniorityLevel'].setValue('JUNIOR');

    let result: ResourceListType[] = component.filterResource('John');

    expect(result).toEqual(expectedResult);
  });

  it('should add a new resource', () => {
    expect(component.resourceDetailsUpdated).toBe(false);

    component.allocatedResources = [];
    (tfrManagementServiceSpy as any).getProjectId = 1;
    component.addResource('John Bowers', 'SCRUM MASTER', 'SENIOR');

    fixture.detectChanges();

    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(true);
    expect(component.allocatedResources.length).toBe(1);
    expect(
      component.allocatedResources.find((resource) => {
        return (
          resource.resource_email ===
          projectResourcesWithNames[0].resource_email
        );
      })
    ).toEqual(projectResourcesWithNames[0]);
  });

  it('should update a resource that was previously deleted', () => {
    let expectAllocatedResources = [...dummyAllocatedResource];
    dummyAllocatedResource[0].is_deleted = true;
    component.allocatedResources = dummyAllocatedResource;

    component.resources = resources;

    component.addResource('John Bowers', 'SCRUM MASTER', 'INTERMEDIATE');

    expect(component.allocatedResources).toEqual(expectAllocatedResources);
  });

  it('should remove resource', () => {
    expect(component.resourceDetailsUpdated).toBe(false);

    component.allocatedResources = dummyAllocatedResource;
    expect(component.allocatedResources).toEqual(dummyAllocatedResource);
    fixture.detectChanges();
    component.removeResource(projectResourcesWithNames[0]);
    projectResourcesWithNames[0].is_deleted = true;

    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(false);
    expect(
      component.allocatedResources.find((resource) => {
        return resource.resource_email === 'johnbowers@accolitedigital.com';
      })
    ).toEqual(projectResourcesWithNames[0]);
  });

  it('trigger next step', () => {
    spyOn(component, 'showDialog');
    component.resourceDetailsUpdated = true;
    component.triggerStep(true);
    fixture.detectChanges();
    expect(component.showDialog).toHaveBeenCalled();
  });

  it('trigger previous step', () => {
    spyOn(component, 'nextStep');
    component.resourceDetailsUpdated = false;
    component.triggerStep(true);
    fixture.detectChanges();
    expect(component.nextStep).toHaveBeenCalled();
  });

  it('emit on next step', () => {
    const emitterValue: boolean = true;
    component.stepCompletedEmitter
      .pipe(first())
      .subscribe((forward: boolean) => {
        expect(forward).toBe(emitterValue);
      });
    component.nextStepEmitter.pipe(first()).subscribe((forward: boolean) => {
      expect(forward).toBe(emitterValue);
    });

    component.nextStep(true);
    fixture.detectChanges();
  });

  it('call service to save to database', () => {
    component.saveToDatabase();
    fixture.detectChanges();
    expect(component.resourceDetailsUpdated).toBe(false);
  });

  it('reset all resources', () => {
    component.resetResources();
    fixture.detectChanges();
    expect(component.allocatedResources).toEqual(projectResourcesWithNames);
    expect(component.resources.length).toBe(2);
    expect(component.resources[0].selected).toBe(true);
    expect(component.resourceDetailsUpdated).toBe(false);
  });

  it('show Dialog box', () => {
    component.showDialog(true);
    fixture.detectChanges();
    let dialogContent: { data: dialogContent } = {
      data: {
        title: 'Discard Changes',
        content: 'Would you like to discard your changes and continue?',
        confirmText: 'Yes',
        cancelText: 'No',
      },
    };

    expect(dialogSpy).toHaveBeenCalledWith(
      TfrCreationDialogComponent,
      dialogContent
    );
  });

  it('should retrieve resource skills by resource id - success', () => {
    let resourceSkills: ResourceSkillDTO[] = [
      {
        resource_id: 1,
        skill: 'Java',
        experience: 1,
      },
      {
        resource_id: 1,
        skill: 'Python',
        experience: 4,
      },
    ];
    apiServiceSpy.getSkillsByResourceId.and.returnValue(of(resourceSkills));
    component.getSkills(1);
    expect(component.currentResourceSkills).toEqual(resourceSkills);
  });

  it('should retrieve resource skills by resource id - server error', () => {
    component.getResourceSkillObserver.error(
      new HttpErrorResponse({
        status: 500,
      })
    );
    expect(component.currentResourceSkills).toEqual([]);
  });
});
