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

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [TfrManagementService],
})
export class StepperComponent implements OnInit {
  @ViewChild('stepper') private myStepper!: MatStepper;

  tfrDetailsFormGroup = this._formBuilder.group({
    tfrName: ['', Validators.required],
  });
  milestoneFormGroup = this._formBuilder.group({
    milestoneName: ['', Validators.required],
  });

  stepsValid: boolean[] = [false, false, false];
  isLinear = true;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    @Inject(FormBuilder) private _formBuilder: FormBuilder,
    protected tfrManagementService: TfrManagementService,
    @Inject(BreakpointObserver)
    protected breakpointObserver: BreakpointObserver,
    private snackBarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 700px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ project }) => {
      this.tfrManagementService.project = project;
      this.tfrManagementService.cleanProjectObject();
    });
  }

  nextStep() {
    this.myStepper.linear = false;
    this.myStepper.next();
    this.myStepper.linear = true;
  }

  stepCompleted(stepNumber: number, completed: boolean) {
    if (stepNumber >= 0) {
      this.stepsValid[stepNumber] = completed;
    }
  }

  redirect() {
    this.router.navigate(['/tfrs']);
    this.snackBarService.showSnackBar('TFR submitted.', 3000);
  }
}
