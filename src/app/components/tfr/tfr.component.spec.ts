import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { Project } from 'src/app/shared/interfaces';
import { DummyProject, DummyProjectResponseOk } from 'src/app/types/dummy-data';
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
  let providersList: any = [];

  const dummyProject: Project = DummyProject;

  beforeEach(() => {
    responseObj = {
      project: DummyProjectResponseOk,
    };

    TestBed.overrideComponent(TfrComponent, {
      set: {
        providers: [
          {
            provide: TfrManagementService,
            useValue: jasmine.createSpyObj('TfrManagementService', [
              'setClientName',
              'setNotes',
              'getProjectObserver',
            ]),
          },
        ],
      },
    });

    providersList = [
      {
        provide: Router,
        useValue: routerSpy,
      },
      {
        provide: MatDialog,
        useClass: MatDialogMock,
      },
    ];
  });

  async function setUpSuccess() {
    providersList.push({
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
    });
    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      providers: providersList,
    }).compileComponents();

    createComponent();
  }

  async function setUpFailurePathVariable() {
    providersList.push({
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
    });
    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      providers: providersList,
    }).compileComponents();

    createComponent();
  }

  async function setUpFailureServerError() {
    let errorMessage: string =
      'Error occured: Http failure response for http://localhost:8080/projects/13: 404 OK';
    let errorResponse: Object = {
      project: errorMessage,
    };
    providersList.push({
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
    });

    await TestBed.configureTestingModule({
      declarations: [TfrComponent],
      providers: providersList,
    }).compileComponents();

    createComponent();
  }

  function createComponent() {
    fixture = TestBed.createComponent(TfrComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);

    tfrManagementServiceSpy = fixture.debugElement.injector.get(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
    (tfrManagementServiceSpy as any).getProjectObserver = {};

    component = fixture.componentInstance;
  }

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
    expect(component).toBeTruthy();
  });

  it('redirect to edit TFR', async () => {
    await setUpSuccess();
    component.TfrId = 1;
    component.redirectToEditTfr();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tfr/1/edit']);
  });
});
