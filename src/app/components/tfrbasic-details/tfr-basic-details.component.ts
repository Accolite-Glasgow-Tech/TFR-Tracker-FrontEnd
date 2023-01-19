import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

import {
  ProjectBasicDetails,
  VendorAttributeDTO,
  VendorDTO,
} from 'src/app/shared/interfaces';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';

@Component({
  selector: 'app-tfr-basic-details',
  templateUrl: './tfr-basic-details.component.html',
  styleUrls: ['./tfr-basic-details.component.scss'],
})
export class TfrBasicDetailsComponent implements OnInit {
  constructor(
    private tfrManager: TfrManagementService,
    private matDialog: MatDialog,
    private apiService: ApiService
  ) {}

  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  tfrDetails!: FormGroup;
  projectDetails!: ProjectBasicDetails;
  selectedProject!: ProjectBasicDetails;
  vendorAttributes!: FormGroup;
  attributeNames: string[] = [];
  vendor_specificData: { [key: string]: string } = {};
  editMode: Boolean = false;
  projectToEdit!: ProjectBasicDetails;
  @Output() editModeEmitter = new EventEmitter<boolean>();

  ngOnInit(): void {
    console.log('Basic Details loaded');

    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      start_date: new FormControl<Date | null>(null),
      end_date: new FormControl<Date | null>(null),
      vendor_id: new FormControl('', [Validators.required]),
    });

    // check whether project exists yet, and if so, pre-fill details and set to edit mode
    if (this.tfrManager.getBasicDetails != undefined) {
      this.editMode = true;
      this.stepCompletedEmitter.emit(true);
      this.editModeEmitter.emit(true);
      // edit mode
      console.log('edit mode');
      this.projectToEdit = this.tfrManager.getBasicDetails;
      // set form group details to existing details
      this.setDetailsToExistingProject();
    }
  }

  isFormValid() {
    if (this.vendorAttributes == undefined) {
      return false;
    } else {
      return this.vendorAttributes.valid && this.tfrDetails.valid;
    }
  }

  isFormDirty() {
    if (this.isFormValid()) {
      return this.vendorAttributes.dirty || this.tfrDetails.dirty;
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
      vendor_id: this.tfrDetails.get('vendor_id')?.value,
      vendor_specific: this.vendor_specificData,
      status: this.editMode ? this.projectToEdit.status : 'DRAFT',
    };
    console.log('saveTFR');
    this.tfrManager.setBasicDetails(updatedProjectDetails);
    console.log(this.tfrManager.getBasicDetails);
    this.tfrDetails.markAsPristine();
    this.vendorAttributes.markAsPristine();
  }

  onVendorSelect(vendor: VendorDTO) {
    this.tfrDetails.get('vendor_id')?.setValue(vendor.id);
  }

  /*
    Move onto the next step of the stepper
  */
  next() {
    if (this.isFormDirty()) {
      let dialogRef = this.matDialog.open(TfrCreationDialogComponent);
      dialogRef.afterClosed().subscribe((result: string) => {
        if (result === 'true') {
          /* User wants to discard changes */
          this.stepCompletedEmitter.emit(true);
          this.nextStepEmitter.emit(true);
          /* Resets the value of the input fields to the most recent state of the database */
          this.resetInputFields();
        }
      });
    } else {
      this.stepCompletedEmitter.emit(true);
      this.nextStepEmitter.emit(true);
    }
  }

  /*
    Resets the input fields to the most recent state of the database
  */
  resetInputFields() {
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
      .get('vendor_id')
      ?.setValue(previousStateBasicDetails.vendor_id);

    this.projectToEdit.vendor_id = previousStateBasicDetails.vendor_id;

    /*
      Trigger event to vendor component through the api.service
    */
    this.apiService.resetVendorDetails();

    this.tfrDetails.markAsPristine();
    this.vendorAttributes.markAsPristine();
  }

  onAttributesSelected(attributes: VendorAttributeDTO[]) {
    this.attributeNames = [];
    attributes.forEach((att) => {
      this.attributeNames.push(att.attribute_name);
    });
  }

  onAttributesUpdated(group: FormGroup) {
    this.vendorAttributes = group;
    this.updatevendor_specific();
  }

  updatevendor_specific() {
    this.vendor_specificData = {};
    // convert the form group info to string data and assign to vendor_specificData string
    if (this.vendorAttributes.valid) {
      let i = 0;
      while (i < this.attributeNames.length) {
        this.vendor_specificData[this.attributeNames[i]] =
          this.getAttributesArray().controls[i].value;
        i++;
      }
    }
  }

  getAttributesArray() {
    return this.vendorAttributes.controls['attributeValues'] as FormArray;
  }
}
