import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO, Project } from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyProject,
} from 'src/app/types/dummy-data';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

import { TfrComponent } from './tfr.component';

export class MatDialogMock {
  open(component: NotesDialogComponent) {
    return {
      afterClosed: () => of('true'),
    };
  }
}

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

  const dummyProject: Project = DummyProject;

  const dummyAllocatedResource: AllocatedResourceTypeDTO[] =
    DummyAllocatedResources;

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
        {
          provide: MatDialog,
          useClass: MatDialogMock,
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
        {
          provide: MatDialog,
          useClass: MatDialogMock,
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
        {
          provide: MatDialog,
          useClass: MatDialogMock,
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
              'setClientName',
              'setNotes',
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
    expect(tfrManagementServiceSpy.setClientName.calls.count()).toBe(1);
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

  it('load fail, project does not exist', async () => {
    await setUpSuccess();
    fixture.detectChanges();
    component.getProjectObserver.next({project: new HttpErrorResponse({status:500})});
    expect(tfrManagementServiceSpy.apiError).toBe(true);
    expect(component).toBeTruthy();
  });

  it('load fail, server down', async () => {
    await setUpSuccess();
    fixture.detectChanges();
    component.getProjectObserver.next({ project: new HttpErrorResponse({status: 503})});
    expect(tfrManagementServiceSpy.serverDown).toBe(true);
    expect(component).toBeTruthy();
  });
});
