import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

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
export class StepperComponent implements OnInit {
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

  constructor(
    private _formBuilder: FormBuilder,
    private tfrManagementService: TfrManagementService
  ) {}

  ngOnInit(): void {
    this.tfrManagementService.project = {
      id: 2,
      name: 'Bank Project',
      vendorId: 1,
      startDate: new Date('December 25, 2021 00:00:00'),
      endDate: new Date('December 25, 2022 00:00:00'),
      vendorSpecific: '',
      status: '',
      version: '',
      milestones: [],
      projectResources: [
        {
          project_id: 2,
          resource_id: 1,
          role: 'SCRUM MASTER',
        },
        {
          project_id: 2,
          resource_id: 2,
          role: 'SOFTWARE DEVELOPER',
        },
        {
          project_id: 2,
          resource_id: 3,
          role: 'PRODUCT OWNER',
        },
      ],
      isDeleted: false,
    };
  }

  nextStep() {
    this.myStepper.linear = false;
    this.resourceSelectionValid = true;
    this.myStepper.next();
    this.myStepper.linear = true;
  }
}
