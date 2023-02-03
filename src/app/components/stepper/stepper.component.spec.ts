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
import {
  DummyAllocatedResources,
  DummyProject,
} from 'src/app/types/dummy-data';
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

  const dummyProject: Project = DummyProject;

  const dummyAllocatedResource: AllocatedResourceTypeDTO[] =
    DummyAllocatedResources;

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
              'setClientName',
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
    expect(tfrManagementServiceSpy.setClientName.calls.count()).toBe(1);
    expect(
      apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.calls.count()
    ).toBe(1);
    expect(component).toBeTruthy();
  });

  it('load fail, project does not exist', async () => {
    await setUpSuccess();
    fixture.detectChanges();
    component.getProjectObserver.error();
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
