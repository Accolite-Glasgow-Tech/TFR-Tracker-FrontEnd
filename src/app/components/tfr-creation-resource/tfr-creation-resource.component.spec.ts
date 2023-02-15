import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { first, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  AllocatedResourceTypeDTO,
  DisplaySkillDTO,
  Project,
  ProjectResourceDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyProject,
  DummyProjectResources,
} from 'src/app/types/dummy-data';
import {
  autoCompleteResourceNameValidator,
  TfrCreationResourceComponent,
} from './tfr-creation-resource.component';

describe('TfrCreationResourceComponent', () => {
  let component: TfrCreationResourceComponent;
  let fixture: ComponentFixture<TfrCreationResourceComponent>;
  let seniorityLevels: string[];
  let dummyAllocatedResource: AllocatedResourceTypeDTO[];
  let projectResources: ProjectResourceDTO[];
  let resources: ResourceListType[];
  let projectResourcesWithNames: AllocatedResourceTypeDTO[];

  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let responseHandlerServiceSpy: jasmine.SpyObj<ResponseHandlerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationResourceComponent],
      imports: [MatAutocompleteModule, MatTooltipModule],
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
            'extractProject',
            'getFromDatabase',
          ]),
        },
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj('ResponseHandlerService', [
            'badGet',
            'unsavedChangesDialogue',
          ]),
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
    responseHandlerServiceSpy = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;

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
    projectResources = DummyProjectResources;

    projectResourcesWithNames = [{ ...DummyAllocatedResources[0] }];
    seniorityLevels = ['ADVANCED', 'SENIOR', 'INTERMEDIATE', 'JUNIOR'];
    dummyAllocatedResource = [...DummyAllocatedResources];

    apiServiceSpy.getAllResources.and.returnValue(of(resources));
    apiServiceSpy.getAllSeniorityLevels.and.returnValue(of(seniorityLevels));
    resourceServiceSpy.resourcesWithoutDeleted.and.returnValue(
      dummyAllocatedResource
    );
    tfrManagementServiceSpy.setProjectResourcesWithNames.and.returnValue();
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue(
      of(true)
    );
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
    expect(projectResourcesWithNames[0].is_deleted).toBe(false);

    component.allocatedResources = [];
    (tfrManagementServiceSpy as any).getProjectId = 1;
    component.addResource('John Bowers', 'SCRUM MASTER', 'SENIOR');

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
    component.resourceDetailsUpdated = true;
    component.triggerStep(true);
    expect(responseHandlerServiceSpy.unsavedChangesDialogue).toHaveBeenCalled();
  });

  it('trigger previous step', () => {
    spyOn(component, 'nextStep');
    component.resourceDetailsUpdated = false;
    component.triggerStep(true);
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
  });

  it('call service to save to database', () => {
    component.saveToDatabase();
    expect(component.resourceDetailsUpdated).toBe(false);
  });

  it('reset all resources', () => {
    let responseBody = new HttpResponse<Project>({
      body: DummyProject,
      status: 200,
    });
    tfrManagementServiceSpy.getFromDatabase.and.returnValue(of(responseBody));
    tfrManagementServiceSpy.extractProject.and.returnValue(responseBody);
    (tfrManagementServiceSpy as any).getResourcesCount = 2;
    component.resetResources();
    expect(component.allocatedResources).toEqual(projectResourcesWithNames);
    expect(component.resources.length).toBe(2);
    expect(component.tooltipMsg).toBe('0 allocated in excess');
    expect(component.resourceDetailsUpdated).toBe(false);
  });

  it('reset all resources - resource count = 0', () => {
    let responseBody = new HttpResponse<Project>({
      body: DummyProject,
      status: 200,
    });
    tfrManagementServiceSpy.getFromDatabase.and.returnValue(of(responseBody));
    tfrManagementServiceSpy.extractProject.and.returnValue(responseBody);
    (tfrManagementServiceSpy as any).getResourcesCount = 0;
    component.resetResources();

    expect(component.resourcesCount).toBe(1);
    expect(component.tooltipMsg).toBe('1 allocated in excess');
    expect(component.resourceDetailsUpdated).toBe(false);
    expect(component.currentResourceSkills).toEqual([]);
  });

  it('should retrieve resource skills by resource id - success', () => {
    let resourceSkills: DisplaySkillDTO[] = [
      {
        skill: 'Python',
        experience: 4,
        percentage: 100.0,
      },
      {
        skill: 'Java',
        experience: 1,
        percentage: 25.0,
      },
    ];
    apiServiceSpy.getSkillsByResourceId.and.returnValue(of(resourceSkills));
    component.getSkills(resources[0]);
    expect(component.currentResourceSkills).toEqual(resourceSkills);
  });

  it('should retrieve resource skills by resource id - server error', () => {
    component.getResourceSkillObserver.error();
    expect(component.currentResourceSkills).toEqual([]);
  });

  it('should emit step not completed on failure to retrieve project', () => {
    component.stepCompletedEmitter
      .pipe(first())
      .subscribe((forward: boolean) => {
        expect(forward).toBe(false);
      });
    component.getProjectObserver.error();
    expect(responseHandlerServiceSpy.badGet).toHaveBeenCalled();
  });

  it('should emit step not completed on failure to retrieve project resources with names', () => {
    component.stepCompletedEmitter
      .pipe(first())
      .subscribe((forward: boolean) => {
        expect(forward).toBe(false);
      });
    component.getResourceNameObserver.error();
    expect(responseHandlerServiceSpy.badGet).toHaveBeenCalled();
  });

  it('should emit step not completed on failure to save to database', () => {
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue(
      of(false)
    );

    component.stepCompletedEmitter
      .pipe(first())
      .subscribe((forward: boolean) => {
        expect(forward).toBe(false);
      });

    component.saveToDatabase();
    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.previousUpdateSuccessful).toBe(false);
  });

  it('should set resources count to 1 when the project is newly created', () => {
    (tfrManagementServiceSpy as any).getResourcesCount = 0;
    component.ngOnInit();
    expect(component.resourcesCount).toBe(1);
  });
});
