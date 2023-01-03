import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/services/reports.service';

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

  constructor() {
    reportsService: ReportsService;
  }

  ngOnInit(): void {
    this.schedulerForm = new FormGroup({
      tfr: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      frequency: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.required]),
      receiver: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    this.schedulerObject.tfr = this.schedulerForm.get('tfr')?.value;
    this.schedulerObject.type = this.schedulerForm.get('type')?.value;
    this.schedulerObject.frequency = this.schedulerForm.get('frequency')?.value;
    this.schedulerObject.schedule = this.schedulerForm.get('schedule')?.value;
    this.schedulerObject.receiver = this.schedulerForm.get('receiver')?.value;
  }
}
