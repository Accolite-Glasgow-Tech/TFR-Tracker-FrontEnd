import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {
  RecieverOptions,
  ProjectDTO,
  ResourceDTO,
  TaskDTO,
  TaskCreationDTO,
} from 'src/app/utils';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(FrequencyPickerComponent, { static: true })
  frequencyPickerComponent!: FrequencyPickerComponent;

  @Input() tfrList: Array<ProjectDTO> = [];
  @Input() template = 'Default Template';
  @Input() recieverOption = RecieverOptions.self;

  resource!: any;
  selectTfrLabelText: string = 'Select TFR';
  selectTemplateLabelText: string = 'Select Template';
  submitButtonText: string = 'Schedule';
  receiverLabelText: string = 'Who do you wish to send reports to?';
  schedulerFormTfr: number | null = null;
  recieverOptionsEnum = RecieverOptions;
  schedulerForm!: FormGroup;

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

    this.schedulerForm = new FormGroup({
      tfr: new FormControl(this.tfrList, [Validators.required]),
      type: new FormControl(this.template, [Validators.required]),
      receiver: new FormControl(this.recieverOption, [Validators.required]),
      frequency: this.frequencyPickerComponent.createFormGroup(),
    });

    this.schedulerForm.get('type')!.disable();

    this.getResourceTFRList(this.resource.id);
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
    let resources: Array<ResourceDTO> = [];

    switch (this.schedulerForm.get('receiver')!.value) {
      case RecieverOptions.self:
        resources = [this.resource];
        break;
      case RecieverOptions.allProjectResources:
        resources = <Array<ResourceDTO>>(
          await lastValueFrom(this.getResourcesByTFR(project_id))
        );
        break;
      case RecieverOptions.custom:
        break;
    }

    let expiration_date: Date = this.schedulerForm
      .get('frequency')!
      .get('expirationDateControl')?.value;
    if (expiration_date !== undefined) {
      expiration_date.setHours(23, 59, 59, 0);
    }

    this.createTask({
      task: {
        project_id: project_id,
        task_type: task_type,
        execute_at: execute_at,
        recurring: recurring,
        cron: cron,
        by_email: by_email,
        expiration_date: expiration_date,
      },
      resources: resources,
    });
  }

  getResourceTFRList(resourceId: number) {
    this.httpClient
      .get(`http://localhost:8080/search/project/all`)
      .subscribe((response) => {
        this.tfrList = <Array<ProjectDTO>>response;
      });
  }

  getResourcesByTFR(tfrId: number | null) {
    return this.httpClient
      .get(`http://localhost:8080/search/resource/project/${tfrId}`)
      .pipe();
  }

  createTask(taskObject: TaskCreationDTO) {
    this.httpClient
      .post('http://localhost:8080/tasks', taskObject)
      .subscribe((response) => console.log(response));
  }
}
