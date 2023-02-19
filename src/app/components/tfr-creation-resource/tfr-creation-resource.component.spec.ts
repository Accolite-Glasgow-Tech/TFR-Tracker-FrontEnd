import { HttpResponse } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { first, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  AddResource,
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
  DummyResources,
  DummySeniorityLevels,
} from 'src/app/types/dummy-data';
import { UpdateResourceDialogComponent } from '../update-resource-dialog/update-resource-dialog.component';
import {
  RESOURCE_NAME,
  TfrCreationResourceComponent,
} from './tfr-creation-resource.component';

fdescribe('TfrCreationResourceComponent', () => {
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
  let dialogSpy: jasmine.Spy;
  let dialogResult: AddResource | undefined;
  let allocationFormGroup: FormGroup = new FormGroup({
    resource_name: new FormControl('John Bowers', {
      validators: [Validators.required],
    }),
    seniorityLevel: new FormControl('SENIOR', {
      validators: [Validators.required],
    }),
    role: new FormControl('SCRUM MASTER', {
      validators: [Validators.required],
    }),
  });
  let resourceFormGroup: FormGroup = new FormGroup({
    resources_count: new FormControl('3', {
      validators: [Validators.required],
    }),
    allocation_form_group: allocationFormGroup,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrCreationResourceComponent],
      imports: [MatAutocompleteModule, MatTooltipModule, MatDialogModule],
      providers: [
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

    resources = [...DummyResources];
    projectResources = [...DummyProjectResources];
    projectResourcesWithNames = [...DummyAllocatedResources];
    seniorityLevels = DummySeniorityLevels;
    dummyAllocatedResource = [...DummyAllocatedResources];

    apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.and.returnValue(
      of(dummyAllocatedResource)
    );
    apiServiceSpy.getAllResources.and.returnValue(of(resources));
    apiServiceSpy.getAllSeniorityLevels.and.returnValue(of(seniorityLevels));

    resourceServiceSpy.resourcesWithoutDeleted.and.returnValue(
      dummyAllocatedResource
    );

    tfrManagementServiceSpy.setProjectResourcesWithNames.and.returnValue();
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue(
      of(true)
    );

    (tfrManagementServiceSpy as any).getProjectResources = projectResources;
    (tfrManagementServiceSpy as any).getProjectResourcesWithNames =
      projectResourcesWithNames;
    (tfrManagementServiceSpy as any).getResourcesCount = 3;

    fixture = TestBed.createComponent(TfrCreationResourceComponent);
    component = fixture.componentInstance;

    spyOn(component.stepCompletedEmitter, 'emit');
    fixture.detectChanges();
  });

  it('should create and initialise values', () => {
    expect(component.resources).toEqual(resources);
    expect(component.seniorityLevels).toBe(seniorityLevels);
    expect(
      tfrManagementServiceSpy.setProjectResourcesWithNames.calls.count()
    ).toBe(1);
    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledWith(true);
    expect(component).toBeTruthy();
  });

  it('should set resource count to 1 for tfr-creation', () => {
    (tfrManagementServiceSpy as any).getResourcesCount = 0;
    component.ngOnInit();
    expect(component.resourceFormGroup.get('resources_count')?.value).toBe(1);
    expect(component.resourcesCount).toBe(1);
  });

  it('should add a new resource', () => {
    component.ngOnInit();
    component.resourceFormGroup = resourceFormGroup;
    expect(component.resourceDetailsUpdated).toBe(false);

    component.allocatedResources = [];
    (tfrManagementServiceSpy as any).getProjectId = 1;
    projectResourcesWithNames[0].is_deleted = false;
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

  it('should add a resource when user has updated an already allocated one', () => {
    component.ngOnInit();
    projectResourcesWithNames[0].is_deleted = false;
    expect(component.resourceDetailsUpdated).toBe(false);
    expect(projectResourcesWithNames[0].is_deleted).toBe(false);
    expect(component.resources).toEqual(resources);
    spyOn(component, 'findResourceIndex').and.returnValue(0);
    (tfrManagementServiceSpy as any).getProjectId = 1;
    component.allocatedResources = [];
    resourceFormGroup.controls['allocation_form_group'].patchValue({
      resource_name: 'John Bowers',
      role: 'SCRUM MASTER',
      seniorityLevel: 'SENIOR',
    });
    component.resourceFormGroup = resourceFormGroup;
    expect(
      component.resourceFormGroup.controls['allocation_form_group'].get(
        'resource_name'
      )?.value
    ).toBe('John Bowers');
    component.addResource();

    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(true);
    expect(component.allocatedResources.length).toBe(1);
    expect(component.allocatedResources[0]).toEqual(
      projectResourcesWithNames[0]
    );
  });

  it('should update a resource that was previously deleted', () => {
    component.resourceFormGroup = resourceFormGroup;
    let expectAllocatedResources = [...dummyAllocatedResource];
    dummyAllocatedResource[0].is_deleted = true;
    component.allocatedResources = [...dummyAllocatedResource];

    component.resources = resources;

    component.addResource('John Bowers', 'SCRUM MASTER', 'SENIOR');

    expect(component.allocatedResources).toEqual(expectAllocatedResources);
  });

  it('should remove resource', () => {
    component.resourceFormGroup = resourceFormGroup;
    expect(component.resourceDetailsUpdated).toBe(false);

    component.allocatedResources = [...dummyAllocatedResource];
    expect(component.allocatedResources).toEqual(dummyAllocatedResource);
    component.removeResource(projectResourcesWithNames[0]);
    let expectedResult: AllocatedResourceTypeDTO = {
      ...projectResourcesWithNames[0],
    };
    expectedResult.is_deleted = true;

    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.resources[0].selected).toBe(false);
    expect(
      component.allocatedResources.find((resource) => {
        return resource.resource_email === 'johnbowers@accolitedigital.com';
      })
    ).toEqual(expectedResult);
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

  it('call service to save to database - save unsuccessful', () => {
    component.saveToDatabase();
    expect(component.resourceDetailsUpdated).toBe(false);
    expect(component.previousUpdateSuccessful).toBe(true);
    expect(
      tfrManagementServiceSpy.setProjectResourcesWithNames.calls.count()
    ).toBe(2);
    expect(tfrManagementServiceSpy.setResourcesCount.calls.count()).toBe(1);
    expect(
      tfrManagementServiceSpy.updateProjectToResourceMapping.calls.count()
    ).toBe(1);
  });

  it('call service to save to database - save successful', () => {
    tfrManagementServiceSpy.updateProjectToResourceMapping.and.returnValue(
      of(false)
    );
    component.saveToDatabase();
    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.previousUpdateSuccessful).toBe(false);
    expect(component.stepCompletedEmitter.emit).toHaveBeenCalledWith(false);
    expect(
      tfrManagementServiceSpy.setProjectResourcesWithNames.calls.count()
    ).toBe(2);
    expect(tfrManagementServiceSpy.setResourcesCount.calls.count()).toBe(1);
    expect(
      tfrManagementServiceSpy.updateProjectToResourceMapping.calls.count()
    ).toBe(1);
  });

  it('reset all resources', () => {
    let responseBody = new HttpResponse<Project>({
      body: DummyProject,
      status: 200,
    });
    component.resourceFormGroup = resourceFormGroup;
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
    component.resourceFormGroup = resourceFormGroup;
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

  it('should reset allocation_form_group on value change', () => {
    component.resourceFormGroup = resourceFormGroup;
    allocationFormGroup.get('resource_name')?.setValue('John Bowers');
    component.valueChanges(allocationFormGroup);
    expect(
      component.resourceFormGroup.controls['allocation_form_group'].get(
        'resource_name'
      )?.value
    ).toBe('John Bowers');
  });

  it('should edit a resource - same name - different role & seniority', () => {
    let resourceToEdit: AllocatedResourceTypeDTO = {
      ...projectResourcesWithNames[0],
    };
    dialogResult = {
      resource_name: 'John Bowers',
      role: 'Team Lead',
      seniority: 'INTERMEDIATE',
    };

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      jasmine.createSpyObj({
        afterClosed: of(dialogResult),
        close: null,
      })
    );
    fixture.detectChanges();

    component.editResource(resourceToEdit);
    expect(dialogSpy).toHaveBeenCalledWith(UpdateResourceDialogComponent, {
      data: {
        resources: resources,
        seniorityLevels: seniorityLevels,
        resourceToEdit: resourceToEdit,
      },
      autoFocus: false,
    });
    let indexOfResource = component.findResourceIndex(
      'John Bowers',
      RESOURCE_NAME
    );
    expect(component.resources[indexOfResource].selected).toBe(true);
    expect(component.resourceDetailsUpdated).toBe(true);
  });

  it('should edit a resource - same resource details returned', () => {
    let resourceToEdit: AllocatedResourceTypeDTO = {
      ...projectResourcesWithNames[0],
    };

    dialogResult = undefined;

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      jasmine.createSpyObj({
        afterClosed: of(dialogResult),
        close: null,
      })
    );

    expect(dialogResult).toBeUndefined;

    component.editResource(resourceToEdit);
    let indexOfResource = component.findResourceIndex(
      resourceToEdit.resource_name,
      RESOURCE_NAME
    );
    expect(component.resourceDetailsUpdated).toBe(false);
    expect(component.resources[indexOfResource].resource_name).toBe(
      resourceToEdit.resource_name
    );
    expect(component.resources[indexOfResource].selected).toBe(true);
  });

  it('should edit a resource - different resource returned', () => {
    let resourceToEdit: AllocatedResourceTypeDTO = {
      ...projectResourcesWithNames[0],
    };

    dialogResult = {
      resource_name: 'Kimberly Gould',
      role: 'Team Lead',
      seniority: 'INTERMEDIATE',
    };

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(
      jasmine.createSpyObj({
        afterClosed: of(dialogResult),
        close: null,
      })
    );

    component.resourceFormGroup = resourceFormGroup;

    component.editResource(resourceToEdit);
    let indexOfResource = component.findResourceIndex(
      'Kimberly Gould',
      RESOURCE_NAME
    );
    expect(component.resourceDetailsUpdated).toBe(true);
    expect(component.resources[indexOfResource].resource_name).toBe(
      'Kimberly Gould'
    );
    expect(component.resources[indexOfResource].selected).toBe(true);
  });

  it('should add event listener', fakeAsync(() => {
    const hostElement: HTMLElement = fixture.nativeElement;
    const resourceCountInput: HTMLInputElement =
      hostElement.querySelector('#resources_count')!;
    resourceCountInput.value = '5';
    resourceCountInput.dispatchEvent(new Event('input'));
    component.resourceFormGroup.controls['resources_count'].setValue(5);

    fixture.detectChanges();
    tick(500);

    expect(component.resourcesCount).toBe(5);
    expect(component.resourceDetailsUpdated).toBe(true);
  }));
});
