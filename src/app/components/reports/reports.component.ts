import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

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
      tfr: new FormControl(null, [Validators.required]),
      type: new FormControl('ALERT', [Validators.required]),
      receiver: new FormControl('self', [Validators.required]),
      frequency: this.frequencyPickerComponent.createFormGroup(),
    });

    this.getResourceTFRList(this.resourceId);
  }

  async onSubmit() {
    let taskObject = {
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
    if (this.schedulerForm.valid) {
      console.log('Is this valid? :', this.schedulerForm.get('tfr')?.value);

      taskObject.task.project_id = this.schedulerForm.get('tfr')?.value;
      taskObject.task.task_type = this.schedulerForm.get('type')?.value;

      let taskDate: Date = this.schedulerForm
        .get('frequency')!
        .get('startDateControl')!.value;
      const [hour, minute] = this.schedulerForm
        .get('frequency')!
        .get('timeControl')!
        .value!.split(':');
      taskDate.setHours(hour, minute, 0, 0);
      console.log('taskdate: ', taskDate.toJSON());

      taskObject.task.execute_at = taskDate.toJSON();

      if (this.schedulerForm.get('frequency')!.get('recurringControl')!.value) {
        taskObject.task.recurring = true;
        taskObject.task.cron = this.frequencyPickerComponent.getCron();
      }

      taskObject.task.by_email = true;

      if (this.schedulerForm.get('receiver')!.value === 'self') {
        taskObject.resource_emails.push(this.resourceEmail);
        taskObject.task.cron = null;
      } else if (
        this.schedulerForm.get('receiver')!.value === 'allProjectResources'
      ) {
        this.resourceList = await this.getResourcesByTFR(
          (taskObject.task.project_id = this.schedulerForm.get('tfr')?.value)
        );
        this.resourceList = await lastValueFrom(this.resourceList);

        this.resourceList.forEach((element: { email: string }) => {
          taskObject.resource_emails.push(element.email);
        });
      }

      console.log('logging taskObject', taskObject);

      this.createTask(taskObject);
    }
  }

  getResourceTFRList(resourceId: number) {
    this.httpClient
      .get(`http://localhost:8080/resources/${resourceId}/projects`)
      .subscribe((response) => {
        this.tfrList = response;
      });
  }

  async getResourcesByTFR(tfrId: number) {
    return this.httpClient
      .get(`http://localhost:8080/search/resource/project/${tfrId}`)
      .pipe();
  }

  createTask(taskObject: any) {
    this.httpClient
      .post('http://localhost:8080/tasks', taskObject)
      .subscribe((response) => console.log(response));
  }
}
