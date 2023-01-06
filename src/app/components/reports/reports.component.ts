import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { HttpClient } from '@angular/common/http';

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

  taskObject = {
    task: {
      project_id: 0,
      task_type: 'ALERT',
      execute_at: '',
      recurring: false,
      cron: null as string | null,
      by_email: true,
    },
    resource_emails: [] as string[],
  };

  schedulerForm!: FormGroup;
  resourceId!: number;
  resourceEmail!: string;
  tfrList: any;
  resourceList: any;

  templates: Template[] = [
    { value: 'ALERT', viewValue: 'Alert' },
    { value: 'REPORT', viewValue: 'Report' },
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.resourceId = 1;
    this.resourceEmail = 'johnbowers@accolitedigital.com';

    this.schedulerForm = new FormGroup({
      tfr: new FormControl(1, [Validators.required]),
      type: new FormControl('ALERT', [Validators.required]),
      receiver: new FormControl('self', [Validators.required]),
      frequency: this.frequencyPickerComponent.createFormGroup(),
    });

    this.getResourceTFRList(this.resourceId);
    this.getResourcesByTFR(
      (this.taskObject.task.project_id = this.schedulerForm.get('tfr')?.value)
    );
  }

  submit() {
    this.taskObject.task.project_id = this.schedulerForm.get('tfr')?.value;
    this.taskObject.task.task_type = this.schedulerForm.get('type')?.value;

    let taskDate: Date = this.schedulerForm
      .get('frequency')!
      .get('startDateControl')!.value;
    const [hour, minute] = this.schedulerForm
      .get('frequency')!
      .get('timeControl')!
      .value!.split(':');
    taskDate.setHours(hour, minute, 0, 0);
    console.log('taskdate: ', taskDate.toJSON());

    this.taskObject.task.execute_at = taskDate.toJSON();

    if (
      this.schedulerForm.get('frequency')!.get('recurringControl')!.value ===
      true
    ) {
      this.taskObject.task.recurring = true;
      this.taskObject.task.cron = this.frequencyPickerComponent.getCron();
    }

    this.taskObject.task.by_email = true;

    if (this.schedulerForm.get('receiver')!.value === 'self') {
      this.taskObject.resource_emails.push(this.resourceEmail);
      this.taskObject.task.cron = null;
    } else if (
      this.schedulerForm.get('receiver')!.value === 'allProjectResources'
    ) {
      this.getResourcesByTFR(
        (this.taskObject.task.project_id = this.schedulerForm.get('tfr')?.value)
      );
      this.resourceList.forEach((element: { email: string }) => {
        this.taskObject.resource_emails.push(element.email);
      });
    }

    console.log('logging taskObject', this.taskObject);

    this.createTask(this.taskObject);
  }

  getResourceTFRList(resourceId: number) {
    this.httpClient
      .get(`http://localhost:8080/resources/${resourceId}/projects`)
      .subscribe((response) => {
        this.tfrList = response;
      });
  }

  getResourcesByTFR(tfrId: number) {
    this.httpClient
      .get(`http://localhost:8080/search/resource/project/${tfrId}`)
      .subscribe((response) => {
        this.resourceList = response;
      });
  }

  createTask(taskObject: any) {
    console.log(
      this.httpClient
        .post('http://localhost:8080/tasks', taskObject)
        .subscribe()
    );
  }
}
