import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  @ViewChild('stepper') private myStepper!: MatStepper;

  /*
    Will be removed once Laura's component is placed in the stepper
  */
  milestoneFormGroup = this._formBuilder.group({
    milestoneName: ['', Validators.required],
  });

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

  /*
    Listens to screen size changes. When the screen is small, the orientation of the stepper 
    will be vertical. A horizontal stepper will appear on a large screen.
  */
  stepLabels: Observable<string[]>;

  constructor(
    @Inject(FormBuilder) private _formBuilder: FormBuilder,
    protected tfrManagementService: TfrManagementService,
    @Inject(BreakpointObserver)
    protected breakpointObserver: BreakpointObserver,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /*
      Listener for the screen size.
      Below 800px, the stepper is vertical.
      Above 800px, the stepper is horizontal.
    */
    this.stepLabels = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(
        map(({ matches }) =>
          matches
            ? ['TFR Basic Details', 'Milestones', 'Resources', 'Summary']
            : ['', '', '', '']
        )
      );
  }

  ngOnInit(): void {
    /*
      The data that will be rendered in the screen is pre-fetched before the component
      is loaded. This component has a resolver (refer to /services/project-resolver) that 
      fetches the project to be displayed.
    */
    this.route.data.subscribe(({ project }) => {
      if (project) {
        this.tfrManagementService.project = project;
        this.tfrManagementService.getResourcesNamesByProjectIdFromDatabase(
          project.id
        );
        this.tfrManagementService.setVendorName(project.vendor_id);
      }
    });
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

  /*
    After submitting the whole project, this method handles the redirection to the URL where all
    the TFRs are displayed. 
    
    A small confirmation pop-up msg (aka a snack bar) is displayed at the bottom of the screen for 3000ms.
  */
  redirect(update: boolean) {
    if (update) {
      this.tfrManagementService
        .updateStatusToDatabase()
        .subscribe((response) => {
          if (response) {
            this.router.navigate(['/tfrs']);
            this.snackBarService.showSnackBar('TFR submitted.', 3000);
          } else {
            this.snackBarService.showSnackBar(
              'TFR not submitted. Error occured',
              5000
            );
          }
        });
    } else {
      this.router.navigate(['/tfrs']);
      this.snackBarService.showSnackBar('TFR updated.', 3000);
    }
  }

  /*  
    In edit mode the submit button should not be present
  */
  setEditMode(editMode: boolean) {
    this.editMode = editMode;
  }
}
