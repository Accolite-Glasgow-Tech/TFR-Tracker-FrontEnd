import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

interface Template {
  value: string;
  viewValue: string;
}

enum RecieverOptions {
  self = 'Only me',
  allProjectResources = 'All project contacts',
  custom = 'Custom',
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(FrequencyPickerComponent, { static: true })
  frequencyPickerComponent!: FrequencyPickerComponent;

  resource!: any;
  tfrList: any;
  resourceList: any;

  templates: Template[] = [
    { value: 'ALERT', viewValue: 'Alert' },
    { value: 'REPORT', viewValue: 'Report' },
  ];

  recieverOptionsEnum = RecieverOptions;

  schedulerForm = new FormGroup({
    tfr: new FormControl<number | null>(null, [Validators.required]),
    type: new FormControl('ALERT', [Validators.required]),
    receiver: new FormControl(RecieverOptions.self, [Validators.required]),
    frequency: this.frequencyPickerComponent.createFormGroup(),
  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.resource = {
      id: 1,
      first_name: 'John',
      last_name: 'Bowers',
      type: 'STAFF',
      email: 'johnbowers@accolitedigital.com',
      is_deleted: false,
    };
  }

  async onSubmit() {
    const project_id = this.schedulerForm.get('tfr')!.value;
    const task_type = 'REPORT';

    const [hour, minute] = this.schedulerForm
      .get('frequency')!
      .get('timeControl')!
      .value!.split(':');

    let execute_at: Date = this.schedulerForm
      .get('frequency')!
      .get('startDateControl')!.value;
    execute_at.setHours(hour, minute, 0, 0);

    const recurring = this.schedulerForm
      .get('frequency')!
      .get('recurringControl')!.value;
    const cron = recurring ? this.frequencyPickerComponent.getCron() : null;

    const by_email = true;
    let resources: Array<any> = [];

    switch (this.schedulerForm.get('receiver')!.value) {
      case RecieverOptions.self:
        resources = [this.resource];
        break;
      case RecieverOptions.allProjectResources:
        let resourceList: any = await this.getResourcesByTFR(project_id);
        resourceList = await lastValueFrom(this.resourceList);
        resourceList.forEach((element: any) => {
          resources.push(element);
        });
        break;
      case RecieverOptions.custom:
        break;
    }

    this.createTask({
      task: {
        project_id: project_id,
        task_type: task_type,
        execute_at: execute_at,
        recurring: recurring,
        cron: cron,
        by_email: by_email,
      },
      resources: resources,
    });
  }

  getResourceTFRList(resourceId: number) {
    this.httpClient
      .get(`http://localhost:8080/resources/${resourceId}/projects`)
      .subscribe((response) => {
        this.tfrList = response;
      });
  }

  async getResourcesByTFR(tfrId: number | null) {
    if (tfrId !== null) {
      return this.httpClient
        .get(`http://localhost:8080/search/resource/project/${tfrId}`)
        .pipe();
    }
    return null;
  }

  createTask(taskObject: any) {
    this.httpClient
      .post('http://localhost:8080/tasks', taskObject)
      .subscribe((response) => console.log(response));
  }
}
