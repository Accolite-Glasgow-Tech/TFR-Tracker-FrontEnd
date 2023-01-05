import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/services/reports.service';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';

interface Template {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(FrequencyPickerComponent, { static: true })
  frequencyPickerComponent!: FrequencyPickerComponent;

  schedulerObject = {
    tfr: '',
    type: '',
    frequency: '',
    schedule: '',
    receiver: '',
  };

  schedulerForm!: FormGroup;

  resourceId!: number;

  tfrDummyList: number[] = [1, 2, 3];

  tfrList: any;

  templates: Template[] = [
    { value: 'ALERT', viewValue: 'Alert' },
    { value: 'REPORT', viewValue: 'Report' },
  ];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.resourceId = 1;

    this.schedulerForm = new FormGroup({
      tfr: new FormControl(1, [Validators.required]),
      type: new FormControl('Alert', [Validators.required]),
      receiver: new FormControl('Self', [Validators.required]),
      frequency: this.frequencyPickerComponent.createFormGroup(),
    });

    this.tfrList = this.reportsService.getResourceTFRList(this.resourceId);
    console.log(this.tfrList);
  }

  submit() {
    console.log(
      this.schedulerForm.get('frequency')!.get('startDateControl')?.value,
      this.frequencyPickerComponent.getCron()
    );
  }
}
