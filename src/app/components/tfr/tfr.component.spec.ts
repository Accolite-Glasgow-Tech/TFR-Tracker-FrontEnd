import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO, Project } from 'src/app/shared/interfaces';

import { TfrComponent } from './tfr.component';

describe('TfrComponent', () => {
  let component: TfrComponent;
  let activatedRoute: ActivatedRoute;
  let fixture: ComponentFixture<TfrComponent>;
  let responseObj: Object;
  const routerSpy = jasmine.createSpyObj('Router', [
    'navigateByUrl',
    'navigate',
  ]);
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  const dummyProject: Project = {
    id: 1,
    name: 'Bench Project',
    vendor_id: 2,
    start_date: new Date('2022-12-12T09:00:00.000+00:00'),
    end_date: new Date('2022-12-31T23:59:59.000+00:00'),
    status: 'INPROGRESS',
    version: 1,
    vendor_specific: {
      Department: 'Finance',
      'ED/MD': 'Julia Lee',
    },
    resources_count: 4,
    milestones: [
      {
        id: 3,
        project_id: 1,
        name: 'deployment',
        description: 'deployment dsecription',
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
        description: 'backend description',
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
    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      providers: [
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
      declarations: [TfrComponent],
      providers: [
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
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getResourcesNamesByProjectIdFromDatabase',
          ]),
        },
      ],
    }).compileComponents();

    createComponent();
  }

  async function setUpFailureServerError() {
    let errorMessage: string =
      'Error occured: Http failure response for http://localhost:8080/projects/13: 404 OK';
    let errorResponse: Object = {
      project: errorMessage,
    };

    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      providers: [
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
            data: of(errorResponse),
          },
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
    fixture = TestBed.createComponent(TfrComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);

    tfrManagementServiceSpy = fixture.debugElement.injector.get(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.and.returnValue(
      of(dummyAllocatedResource)
    );

    component = fixture.componentInstance;
  }

  beforeEach(() => {
    responseObj = {
      project: new HttpResponse<Project>({
        body: dummyProject,
        status: 200,
      }),
    };

    TestBed.overrideComponent(TfrComponent, {
      set: {
        providers: [
          {
            provide: TfrManagementService,
            useValue: jasmine.createSpyObj('TfrManagementService', [
              'setVendorName',
            ]),
          },
        ],
      },
    });
  });

  it('path variable not an integer, should redirect to home page', async () => {
    await setUpFailurePathVariable();
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(component).toBeTruthy();
  });

  it('load fail, server error', async () => {
    await setUpFailureServerError();
    fixture.detectChanges();
    expect(component.TfrId).toBe(13);
    expect(component).toBeTruthy();
  });

  it('load project given projectId path variable', async () => {
    await setUpSuccess();
    fixture.detectChanges();
    expect(component.TfrId).toBe(1);
    expect(tfrManagementServiceSpy.setVendorName.calls.count()).toBe(1);
    expect(
      apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.calls.count()
    ).toBe(1);
    expect(component).toBeTruthy();
  });

  it('redirect to edit TFR', async () => {
    await setUpSuccess();
    component.TfrId = 1;
    component.redirectToEditTfr();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tfr/1/edit']);
  });
});
