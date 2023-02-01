import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { Project } from 'src/app/shared/interfaces';

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
    milestones: [
      {
        id: 3,
        project_id: 1,
        description: 'deployment',
        start_date: new Date('2022-12-26T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: true,
      },
      {
        id: 2,
        project_id: 1,
        description: 'frontend',
        start_date: new Date('2022-12-19T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
      {
        id: 1,
        project_id: 1,
        description: 'backend',
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
      },
      {
        project_id: 1,
        resource_id: 1,
        role: 'SCRUM_MASTER',
      },
      {
        project_id: 1,
        resource_id: 2,
        role: 'PROJECT_MANAGER',
      },
    ],
  };

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
              'getResourcesNamesByProjectIdFromDatabase',
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
      tfrManagementServiceSpy.getResourcesNamesByProjectIdFromDatabase.calls.count()
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
