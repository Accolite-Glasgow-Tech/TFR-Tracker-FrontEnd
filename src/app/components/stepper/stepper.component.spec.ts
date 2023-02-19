import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { filter, from, map, Observable, of } from 'rxjs';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
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
  let providers: any = [];

  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let responseHandlerServiceSpy: jasmine.SpyObj<ResponseHandlerService>;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;

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

  beforeEach(() => {
    TestBed.overrideComponent(StepperComponent, {
      set: {
        providers: [
          {
            provide: TfrManagementService,
            useValue: jasmine.createSpyObj('TfrManagementService', [
              'setClientName',
              'updateStatusToDatabase',
              'getProjectResourcesWithNames',
              'getProjectObserver',
            ]),
          },
        ],
      },
    });

    providers = [
      {
        provide: Router,
        useValue: routerSpy,
      },
      {
        provide: ResponseHandlerService,
        useValue: jasmine.createSpyObj('ResponseHandlerService', [
          'goodSave',
          'badSave',
        ]),
      },
      {
        provide: BreakpointObserver,
        useValue: breakPointSpy,
      },
      {
        provide: ResourceService,
        useValue: jasmine.createSpyObj(['resourcesWithoutDeleted']),
      },
    ];
  });

  async function setUpSuccess() {
    responseObj = {
      project: new HttpResponse<Project>({
        body: dummyProject,
        status: 200,
      }),
    };

    providers.push({
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
      declarations: [StepperComponent],
      providers: providers,
    }).compileComponents();

    createComponent();
  }

  async function setUpFailurePathVariable() {
    providers.push({
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
      declarations: [StepperComponent],
      providers: providers,
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
    responseHandlerServiceSpy = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;

    TestBed.inject(BreakpointObserver);

    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('load project given projectId path variable', async () => {
    await setUpSuccess();
    fixture.detectChanges();
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
  });

  it('update project status and redirect to /tfrs failure', async () => {
    await setUpSuccess();
    tfrManagementServiceSpy.updateStatusToDatabase.and.returnValue(of(false));
    component.redirect(true);
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

  it('should display bad save msg when submit tfr fails', async () => {
    await setUpSuccess();
    component.submitTFRObserver.error();
    expect(responseHandlerServiceSpy.badSave).toHaveBeenCalled();
  });
});
