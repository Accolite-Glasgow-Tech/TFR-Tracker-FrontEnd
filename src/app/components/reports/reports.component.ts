import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/services/reports.service';

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
  schedulerObject = {
    tfr: '',
    type: '',
    frequency: '',
    schedule: '',
    receiver: '',
  };

  schedulerForm!: FormGroup;

  resourceId!: number;

  tfrList: number[] = [1, 2, 3];

  templates: Template[] = [
    { value: 'Alert', viewValue: 'Alert' },
    { value: 'Report', viewValue: 'Report' },
  ];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.resourceId = 1;

    this.schedulerForm = new FormGroup({
      tfr: new FormControl('1', [Validators.required]),
      type: new FormControl('Alert', [Validators.required]),
      frequency: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.required]),
      receiver: new FormControl('Self', [Validators.required]),
    });

    //this.tfrList = this.reportsService.getResourceTFRList(this.resourceId);
  }

  submit() {
    console.log(
      (this.schedulerObject.tfr = this.schedulerForm.get('tfr')?.value)
    );
    console.log(
      (this.schedulerObject.type = this.schedulerForm.get('type')?.value)
    );
    console.log(
      (this.schedulerObject.frequency =
        this.schedulerForm.get('frequency')?.value)
    );
    console.log(
      (this.schedulerObject.schedule =
        this.schedulerForm.get('schedule')?.value)
    );
    console.log(
      (this.schedulerObject.receiver =
        this.schedulerForm.get('receiver')?.value)
    );
  }
}
