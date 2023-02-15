import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ResourceDTO, TaskCreationDTO } from 'src/app/shared/interfaces';

import { log } from 'src/app/shared/utils';

import { ActivatedRoute } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';

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

  @Input() template = 'Default Template';
  @Input() recieverOption = RecieverOptions.allProjectResources;

  tfrId!: number;
  selectTfrLabelText: string = 'Select TFR';
  selectTemplateLabelText: string = 'Select Template';
  submitButtonText: string = 'Schedule';
  receiverLabelText: string = 'Who do you wish to send reports to?';
  schedulerFormTfr: number | null = null;
  recieverOptionsEnum = RecieverOptions;
  schedulerForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((result) => {
      this.tfrId = Number(result.get('id'));
    });

    this.schedulerForm = new FormGroup({
      type: new FormControl(this.template, [Validators.required]),
      receiver: new FormControl(this.recieverOption, [Validators.required]),
      frequency: this.frequencyPickerComponent.createFormGroup(),
    });

    this.schedulerForm.get('type')!.disable();
  }

  async onSubmit() {
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
    let resources: ResourceDTO[] = [];

    switch (this.schedulerForm.get('receiver')!.value) {
      case RecieverOptions.self:
        resources = [];
        break;
      case RecieverOptions.allProjectResources:
        resources = <ResourceDTO[]>(
          await lastValueFrom(
            this.apiService.getResourcesByProjectId(this.tfrId)
          )
        );
        break;
      case RecieverOptions.custom:
        break;
    }

    let expiration_date: Date = this.schedulerForm
      .get('frequency')!
      .get('expirationDateControl')?.value;
    if (expiration_date !== null) {
      expiration_date.setHours(23, 59, 59, 0);
    }

    this.createTask({
      task: {
        project_id: this.tfrId,
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

  getResourcesByTFRId(tfrId: number) {
    return this.apiService.getResourcesByProjectId(tfrId);
  }

  createTask(taskObject: TaskCreationDTO) {
    log(taskObject);
    this.apiService.postTask(taskObject).subscribe(
      (response) => {
        log(response);
        this.snackBarService.showSnackBar(
          'Report was scheduled successfully',
          2000
        );
      },
      (error) => {
        log(error);
        this.snackBarService.showSnackBar(
          'Something went wrong! Please try again later',
          2000
        );
      }
    );
  }
}
