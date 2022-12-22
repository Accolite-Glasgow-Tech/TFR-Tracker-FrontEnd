import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  tfrDetailsFormGroup = this._formBuilder.group({
    tfrName: ['', Validators.required],
  });
  milestoneFormGroup = this._formBuilder.group({
    milestoneName: ['', Validators.required],
  });
  resourceFormGroup = this._formBuilder.group({
    resourceName: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}
}
