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
    let tfrId = Number(this.route.snapshot.paramMap.get('id'));
    // this.tfrManagementService.getProjectFromDatabaseByProjectId(tfrId);
    this.tfrManagementService.project = {
      id: 1,
      name: 'Bank Project',
      vendor_id: 1,
      start_date: new Date('December 25, 2021 00:00:00'),
      end_date: new Date('December 31, 2022 00:00:00'),
      vendor_specific:
        '{"Department":"Finance", "Cost Center":"Private Banking", "City":"Glasgow", "Manager":"Jake Lam"}',
      status: 'DRAFT',
      version: 1,
      milestones: [
        {
          id: 1,
          project_id: 2,
          description: 'deployment',
          start_date: new Date('2022-12-12 09:00:00'),
          delivery_date: new Date('2022-12-16 23:59:59'),
          acceptance_date: new Date('2022-12-31 23:59:59'),
          is_deleted: false,
          tracker: {
            milestone_id: 1,
            project_id: 1,
            start_date: new Date('2022-12-12T09:00:00.000+00:00'),
            end_date: new Date('2022-12-16T23:59:59.000+00:00'),
            status: 'PROGRESS',
            created_by: 1,
            modified_by: 2,
            created_at: new Date('2022-12-01T09:00:00.000+00:00'),
            modified_at: new Date('2022-12-01T10:00:00.000+00:00'),
          },
        },
      ],
      project_resources: [
        {
          project_id: 1,
          resource_id: 1,
          role: 'SCRUM_MASTER',
        },
        {
          project_id: 1,
          resource_id: 2,
          role: 'SOFTWARE_DEVELOPER',
        },
      ],
      is_deleted: false,
      created_by: 1,
      modified_by: 2,
      created_at: new Date('2022-12-01T08:00:00.000+00:00'),
      modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
    };
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
