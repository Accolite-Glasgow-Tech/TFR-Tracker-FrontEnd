import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

interface ResourceListType {
  resource_name: string;
  resource_id: string;
  selected: boolean;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @ViewChild('stepper') private myStepper!: MatStepper;

  tfrDetailsFormGroup = this._formBuilder.group({
    tfrName: ['', Validators.required],
  });
  milestoneFormGroup = this._formBuilder.group({
    milestoneName: ['', Validators.required],
  });
  resourceFormGroup = this._formBuilder.group({
    resourceName: ['', Validators.required],
  });
  resourceSelectionValid: boolean = false;
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}

  nextStep() {
    this.myStepper.linear = false;
    this.resourceSelectionValid = true;
    this.myStepper.next();
    this.myStepper.linear = true;
  }
}
