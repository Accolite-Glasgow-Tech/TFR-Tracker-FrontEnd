import { BreakpointObserver } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    TfrManagementService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class StepperComponent implements OnInit {
  @ViewChild('stepper') myStepper!: MatStepper;

  /*
    The size of this array is proportional to the number of steps in the stepper (excluding the
    last summary step).

    This array holds whether a step has been completed. For e.g:
    At index 0 with a value of false indicates that the step 1 has not been completed.
  */
  stepsValid: boolean[] = [false, false, false];
  editMode: boolean = false;

  /*
    controls whether the user can move to another step without completing its current step.

    A value of true forces the user to complete its current step before moving to the next.
  */
  isLinear = true;
  stepLabels: Observable<string[]>;
  sessionStorage = sessionStorage;

  submitTFRObserver = {
    next: () => {
      this.router.navigate(['/tfrs']);
      this.responseHandlerService.goodSave();
    },
    error: () => {
      this.responseHandlerService.badSave();
    },
  };

  constructor(
    @Inject(TfrManagementService)
    protected tfrManagementService: TfrManagementService,
    protected breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private responseHandlerService: ResponseHandlerService
  ) {
    /*
      Listener for the screen size.
      Below 800px, the stepper labels are just icons
      Above 800px, the stepper labels are icons and text
    */
    this.stepLabels = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(
        map(({ matches }) =>
          matches
            ? ['TFR Basic Details', 'Milestones', 'Resources', 'TFR Submission']
            : ['', '', '', '']
        )
      );
  }

  ngOnInit(): void {
    if (this.route.snapshot.routeConfig?.path !== 'tfr/create') {
      let tfrId = Number(this.route.snapshot.paramMap.get('id'));

      if (!Number.isInteger(tfrId)) {
        this.router.navigate(['/home']);
      } else {
        this.route.paramMap.subscribe((result) => {
          tfrId = Number(result.get('id'));
          this.route.data.subscribe(
            this.tfrManagementService.getProjectObserver
          );
        });
      }
    }
  }

  /*
    Programmatically moves to the next step.

    To be able to programmatically move to the next step, the stepper should NOT be
    linear. The stepper is momentarily made not linear.
    forward = true => Move to next step
    forward = false => Move to previous step
  */
  nextStep(forward: boolean) {
    this.myStepper.linear = false;
    if (forward) {
      this.myStepper.next();
    } else {
      this.myStepper.previous();
    }
    this.myStepper.linear = true;
  }

  /*
    When each step gets notified by its child component that the step has been completed through
    an emitter, this method should be called with the stepNumber (first index at 0) and
    TRUE (step completed).
  */
  stepCompleted(stepNumber: number, completed: boolean) {
    if (stepNumber >= 0) {
      this.stepsValid[stepNumber] = completed;
    }
  }

  redirect(update: boolean) {
    if (update || this.tfrManagementService.project?.status === 'DRAFT') {
      this.tfrManagementService
        .updateStatusToDatabase()
        .subscribe(this.submitTFRObserver);
    } else {
      this.router.navigate(['/tfrs']);
    }
  }

  setEditMode(editMode: boolean) {
    this.editMode = editMode;
  }

  get currentResourcesWithNames(): AllocatedResourceTypeDTO[] {
    return this.resourceService.resourcesWithoutDeleted(
      this.tfrManagementService.getProjectResourcesWithNames
    );
  }
}
