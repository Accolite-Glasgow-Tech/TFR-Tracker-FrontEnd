import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { filter, from, map, Observable, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO, Project } from 'src/app/shared/interfaces';

import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  let activatedRoute: ActivatedRoute;
  let responseObj: Object;
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
    'showSnackBar',
  ]);
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const matchObj = [{ matchStr: '(min-width: 800px)', result: false }];
  const fakeObserve = (s: string[]): Observable<BreakpointState> =>
    from(matchObj).pipe(
      filter((match) => match.matchStr === s[0]),
      map((match) => ({ matches: match.result, breakpoints: {} }))
    );
  const breakPointSpy = jasmine.createSpyObj('BreakPointObserver', ['observe']);
  breakPointSpy.observe.and.callFake(fakeObserve);

  function resize(width: number): void {
    matchObj[0].result = width >= 800;
  }

  const dummyProject: Project = {
    id: 1,
    name: 'Bench Project',
    client_id: 2,
    start_date: new Date('2022-12-12T09:00:00.000+00:00'),
    end_date: new Date('2022-12-31T23:59:59.000+00:00'),
    status: 'INPROGRESS',
    version: 1,
    client_specific: {
      Department: 'Finance',
      'ED/MD': 'Julia Lee',
    },
    resources_count: 4,
    milestones: [
      {
        id: 3,
        project_id: 1,
        name: 'deployment',
        description: 'deployment description',
        start_date: new Date('2022-12-26T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: true,
      },
      {
        id: 2,
        project_id: 1,
        name: 'frontend',
        description: 'frontend description',
        start_date: new Date('2022-12-19T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
      {
        id: 1,
        project_id: 1,
        name: 'backend',
        description: 'backend desccription',
        start_date: new Date('2022-12-12T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-16T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
    ],
    is_deleted: false,
    created_by: 1,
    modified_by: 2,
    created_at: new Date('2022-12-01T08:00:00.000+00:00'),
    modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
    project_resources: [
      {
        project_id: 1,
        resource_id: 3,
        role: 'SOFTWARE_DEVELOPER',
        seniority: 'JUNIOR',
        is_deleted: false,
      },
      {
        project_id: 1,
        resource_id: 1,
        role: 'SCRUM_MASTER',
        seniority: 'SENIOR',
        is_deleted: false,
      },
      {
        project_id: 1,
        resource_id: 2,
        role: 'PROJECT_MANAGER',
        seniority: 'ADVANCED',
        is_deleted: false,
      },
    ],
  };
  const dummyAllocatedResource: AllocatedResourceTypeDTO[] = [
    {
      project_id: 1,
      resource_id: 1,
      resource_name: 'John Bowers',
      resource_email: 'johnbowers@accolitedigital.com',
      seniority: 'SENIOR',
      is_deleted: false,
      role: 'SCRUM MASTER',
    },
    {
      project_id: 1,
      resource_id: 3,
      resource_name: 'Kimberly Gould',
      resource_email: 'kimberlygould@accolitedigital.com',
      seniority: 'JUNIOR',
      is_deleted: false,
      role: 'SOFTWARE DEVELOPER',
    },
  ];

  async function setUpSuccess() {
    responseObj = {
      project: new HttpResponse<Project>({
        body: dummyProject,
        status: 200,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [StepperComponent],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: string) => {
                  return '1';
                },
              },
            },
            paramMap: of(convertToParamMap({ id: 1 })),
            data: of(responseObj),
          },
        },
        {
          provide: SnackBarService,
          useValue: snackBarServiceSpy,
        },
        {
          provide: BreakpointObserver,
          useValue: breakPointSpy,
        },
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['resourcesWithoutDeleted']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getResourcesNamesByProjectIdFromDatabase',
          ]),
        },
      ],
    }).compileComponents();

    createComponent();
  }

  async function setUpFailurePathVariable() {
    await TestBed.configureTestingModule({
      declarations: [StepperComponent],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: string) => {
                  return 'asds';
                },
              },
            },
            paramMap: of(convertToParamMap({ id: 'asds' })),
            data: of(responseObj),
          },
        },
        {
          provide: SnackBarService,
          useValue: snackBarServiceSpy,
        },
        {
          provide: BreakpointObserver,
          useValue: breakPointSpy,
        },
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['resourcesWithoutDeleted']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getResourcesNamesByProjectIdFromDatabase',
          ]),
        },
      ],
    }).compileComponents();

    createComponent();
  }

  async function setUpFailureProjectNotFound() {
    responseObj = {
      project: new HttpResponse<Project>({
        body: dummyProject,
        status: 404,
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [StepperComponent],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: string) => {
                  return '13';
                },
              },
            },
            paramMap: of(convertToParamMap({ id: '13' })),
            data: of(responseObj),
          },
        },
        {
          provide: SnackBarService,
          useValue: snackBarServiceSpy,
        },
        {
          provide: BreakpointObserver,
          useValue: breakPointSpy,
        },
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['resourcesWithoutDeleted']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getResourcesNamesByProjectIdFromDatabase',
          ]),
        },
      ],
    }).compileComponents();

    createComponent();
  }

  function createComponent() {
    fixture = TestBed.createComponent(StepperComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tfrManagementServiceSpy = fixture.debugElement.injector.get(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    resourceServiceSpy = TestBed.inject(
      ResourceService
    ) as jasmine.SpyObj<ResourceService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    TestBed.inject(BreakpointObserver);
    apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.and.returnValue(
      of(dummyAllocatedResource)
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.overrideComponent(StepperComponent, {
      set: {
        providers: [
          {
            provide: TfrManagementService,
            useValue: jasmine.createSpyObj('TfrManagementService', [
              'setVendorName',
              'updateStatusToDatabase',
            ]),
          },
        ],
      },
    });
  });

  it('load project given projectId path variable', async () => {
    await setUpSuccess();
    fixture.detectChanges();
    expect(tfrManagementServiceSpy.setVendorName.calls.count()).toBe(1);
    expect(
      apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.calls.count()
    ).toBe(1);
    expect(component).toBeTruthy();
  });

  it('load fail, project does not exist', async () => {
    await setUpFailureProjectNotFound();
    fixture.detectChanges();
    expect(tfrManagementServiceSpy.apiError).toBe(true);
    expect(component).toBeTruthy();
  });

  it('path variable not an integer, should redirect to home page', async () => {
    await setUpFailurePathVariable();
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('move to next step', async () => {
    await setUpSuccess();
    const stepperSpy = jasmine.createSpyObj('MatStepper', ['next']);
    component.myStepper = stepperSpy;
    component.nextStep(true);
    expect(component.myStepper.next).toHaveBeenCalled();
  });

  it('move to previous step', async () => {
    await setUpSuccess();
    const stepperSpy = jasmine.createSpyObj('MatStepper', ['previous']);
    component.myStepper = stepperSpy;
    component.nextStep(false);
    expect(component.myStepper.previous).toHaveBeenCalled();
  });

  it('mark specific step as completed', async () => {
    await setUpSuccess();
    expect(component.stepsValid[1]).toBe(false);
    component.stepCompleted(1, true);
    expect(component.stepsValid[1]).toBe(true);
  });

  it('update project status and redirect to /tfrs success', async () => {
    await setUpSuccess();
    tfrManagementServiceSpy.updateStatusToDatabase.and.returnValue(of(true));
    component.redirect(true);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tfrs']);
    expect(snackBarServiceSpy.showSnackBar).toHaveBeenCalledWith(
      'TFR submitted.',
      3000
    );
  });

  it('update project status and redirect to /tfrs failure', async () => {
    await setUpSuccess();
    tfrManagementServiceSpy.updateStatusToDatabase.and.returnValue(of(false));
    component.redirect(true);
    expect(snackBarServiceSpy.showSnackBar).toHaveBeenCalledWith(
      'TFR not submitted. Error occured',
      5000
    );
  });

  it('redirect without updating to database', async () => {
    await setUpSuccess();
    component.redirect(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tfrs']);
  });

  it('set edit mode', async () => {
    await setUpSuccess();
    component.setEditMode(true);
    expect(component.editMode).toBe(true);
  });

  it('should return allocated resources without delete', () => {
    resourceServiceSpy.resourcesWithoutDeleted.and.returnValue(
      dummyAllocatedResource
    );
    expect(component.currentResourcesWithNames).toEqual(dummyAllocatedResource);
  });
});
