import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  ProjectBasicDetails,
  Vendor,
  VendorAttribute,
} from 'src/app/types/types';
import { TfrCreationDialogComponent } from '../tfr-creation-dialog/tfr-creation-dialog.component';

@Component({
  selector: 'app-tfr-basic-details',
  templateUrl: './tfr-basic-details.component.html',
  styleUrls: ['./tfr-basic-details.component.scss'],
})
export class TfrBasicDetailsComponent implements OnInit {
  constructor(
    private tfrManager: TfrManagementService,
    private matDialog: MatDialog
  ) {}

  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  tfrDetails!: FormGroup;
  projectDetails!: ProjectBasicDetails;
  selectedProject!: ProjectBasicDetails;
  vendorAttributes!: FormGroup;
  attributeNames: string[] = [];
  vendor_specificData: string = '';
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

    this.tfrManager.setBasicDetails(updatedProjectDetails);
    this.tfrDetails.markAsPristine();
    this.vendorAttributes.markAsPristine();

    /* Need to add API database call here to save to database */
  }

  onVendorSelect(vendor: Vendor) {
    console.log(this.tfrDetails);
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
    let previousStateVendor: Object = this.tfrManager.getVendorSpecificObject;
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
    let i = 0;
    while (i < this.attributeNames.length) {
      let attributeName = this.getAttributesArray().controls[i];
      attributeName.setValue(
        previousStateVendor[this.attributeNames[i] as keyof Object]
      );
      i++;
    }
    this.tfrDetails.markAsPristine();
    this.vendorAttributes.markAsPristine();
  }

  onAttributesSelected(attributes: VendorAttribute[]) {
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
    // convert the form group info to string data and assign to vendor_specificData string
    if (this.vendorAttributes.valid) {
      this.vendor_specificData = '{';
      let i = 0;
      while (i < this.attributeNames.length) {
        if (i > 0) {
          this.vendor_specificData = this.vendor_specificData.concat(', ');
        }
        this.vendor_specificData = this.vendor_specificData.concat(
          '"' +
            this.attributeNames[i] +
            '": "' +
            this.getAttributesArray().controls[i].value +
            '"'
        );
        i += 1;
      }
      this.vendor_specificData = this.vendor_specificData.concat('}');
    }
  }

  getAttributesArray() {
    return this.vendorAttributes.controls['attributeValues'] as FormArray;
  }
}
