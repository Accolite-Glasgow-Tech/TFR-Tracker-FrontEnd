import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  ClientAttributeDTO,
  ClientDTO,
  Project,
  ProjectBasicDetails,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-tfr-basic-details',
  templateUrl: './tfr-basic-details.component.html',
  styleUrls: ['./tfr-basic-details.component.scss'],
})
export class TfrBasicDetailsComponent implements OnInit {
  constructor(
    protected tfrManager: TfrManagementService,
    private apiService: ApiService,
    private responseHandlerService: ResponseHandlerService
  ) {}

  getProjectObserver = {
    next: (project: HttpResponse<Project>) => {
      this.tfrManager.extractProject(project);
      let previousStateBasicDetails: ProjectBasicDetails =
        this.tfrManager.getBasicDetails!;

      this.tfrDetails.get('name')?.setValue(previousStateBasicDetails.name);
      this.tfrDetails
        .get('start_date')
        ?.setValue(previousStateBasicDetails.start_date);
      this.tfrDetails
        .get('end_date')
        ?.setValue(previousStateBasicDetails.end_date);
      this.tfrDetails
        .get('client_id')
        ?.setValue(previousStateBasicDetails.client_id);

      if (this.projectToEdit !== undefined) {
        this.projectToEdit.client_id = previousStateBasicDetails.client_id;
      }

      this.apiService.resetClientDetails();
      this.clientGroup.markAsPristine();

      this.tfrDetails.markAsPristine();
    },
    error: (err: HttpErrorResponse) => {
      if (err.status === 400) {
        this.tfrDetails.reset();
        if (this.clientGroup) {
          this.apiService.resetClientDetails();
          this.clientGroup.markAsPristine();
        }
      } else {
        this.responseHandlerService.badGet();
      }
      this.stepCompletedEmitter.emit(false);
    },
  };

  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  tfrDetails!: FormGroup;
  projectDetails!: ProjectBasicDetails;
  selectedProject!: ProjectBasicDetails;
  clientGroup!: FormGroup;
  attributeNames: string[] = [];
  client_specificData: { [key: string]: string } = {};
  editMode: boolean = false;
  projectToEdit!: ProjectBasicDetails;
  previousUpdateSuccessful!: boolean;
  @Output() editModeEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      start_date: new FormControl<Date | null>(null),
      end_date: new FormControl<Date | null>(null),
      client_id: new FormControl('', [Validators.required]),
    });

    // check whether project exists yet, and if so, pre-fill details and set to edit mode
    if (this.tfrManager.getBasicDetails != undefined) {
      this.editMode = true;
      this.stepCompletedEmitter.emit(true);
      this.editModeEmitter.emit(true);
      // edit mode
      this.projectToEdit = this.tfrManager.getBasicDetails;
      // set form group details to existing details
      this.setDetailsToExistingProject();
    }

    this.previousUpdateSuccessful = this.editMode;
  }

  isFormValid() {
    if (this.clientGroup == undefined) {
      return false;
    } else {
      return this.clientGroup.valid && this.tfrDetails.valid;
    }
  }

  isFormDirty() {
    if (this.isFormValid()) {
      return this.clientGroup.dirty || this.tfrDetails.dirty;
    }
    return false;
  }

  setDetailsToExistingProject() {
    this.tfrDetails.get('name')?.setValue(this.projectToEdit.name);
    this.tfrDetails.get('start_date')?.setValue(this.projectToEdit.start_date);
    this.tfrDetails.get('end_date')?.setValue(this.projectToEdit.end_date);
  }

  saveTFR() {
    // take data from tfrDetails and combine with residual info from selected project id
    let updatedProjectDetails: ProjectBasicDetails = {
      name: this.tfrDetails.get('name')?.value,
      start_date: this.tfrDetails.get('start_date')?.value,
      end_date: this.tfrDetails.get('end_date')?.value,
      client_id: this.tfrDetails.get('client_id')?.value,
      client_specific: this.client_specificData,
      status: this.editMode ? this.projectToEdit.status : 'DRAFT',
    };
    this.tfrManager
      .setBasicDetails(updatedProjectDetails, this.previousUpdateSuccessful)
      .subscribe((response) => {
        this.previousUpdateSuccessful = response;
        if (response) {
          this.tfrDetails.markAsPristine();
          this.clientGroup.markAsPristine();
        } else {
          this.stepCompletedEmitter.emit(false);
        }
      });
  }

  onClientSelect(client: ClientDTO) {
    this.tfrDetails.get('client_id')?.setValue(client.id);
    this.tfrDetails.get('client_id')?.markAsDirty;
  }

  next() {
    if (this.isFormDirty()) {
      this.responseHandlerService.unsavedChangesDialogue();
    } else {
      this.stepCompletedEmitter.emit(true);
      this.nextStepEmitter.emit(true);
    }
  }

  resetInputFields() {
    this.tfrManager
      .getFromDatabase(this.tfrManager.getProjectId as Number)
      .subscribe(this.getProjectObserver);
  }

  onAttributesSelected(attributes: ClientAttributeDTO[]) {
    this.attributeNames = [];
    attributes.forEach((att) => {
      this.attributeNames.push(att.attribute_name);
    });
  }

  onAttributesUpdated(group: FormGroup) {
    this.clientGroup = group;
    this.updateClient_specific();
  }

  updateClient_specific() {
    this.client_specificData = {};
    // convert the form group info to string data and assign to client_specificData string
    if (this.clientGroup.valid) {
      let i = 0;
      while (i < this.attributeNames.length) {
        this.client_specificData[this.attributeNames[i]] =
          this.getAttributesArray().controls[i].value;
        i++;
      }
    }
  }

  getAttributesArray() {
    return this.clientGroup.controls['attributeValues'] as FormArray;
  }
}
