import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  ProjectBasicDetails,
  Vendor,
  VendorAttribute,
} from 'src/app/types/types';

@Component({
  selector: 'app-tfr-basic-details',
  templateUrl: './tfr-basic-details.component.html',
  styleUrls: ['./tfr-basic-details.component.scss'],
})
export class TfrBasicDetailsComponent implements OnInit {
  constructor(private tfrManager: TfrManagementService) {}

  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();

  tfrDetails!: FormGroup;
  projectDetails!: ProjectBasicDetails;
  selectedProject!: ProjectBasicDetails;
  vendorAttributes!: FormGroup;
  attributeNames: string[] = [];
  vendorSpecificData: string = '';
  editMode: Boolean = false;
  projectToEdit!: ProjectBasicDetails;

  ngOnInit(): void {
    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      vendorId: new FormControl('', [Validators.required]),
    });

    // check whether project exists yet, and if so, pre-fill details and set to edit mode
    if (this.tfrManager.getBasicDetails != undefined) {
      this.editMode = true;
      this.stepCompletedEmitter.emit(true);
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

  setDetailsToExistingProject() {
    this.tfrDetails.get('name')?.setValue(this.projectToEdit.name);
    this.tfrDetails.get('startDate')?.setValue(this.projectToEdit.startDate);
    this.tfrDetails.get('endDate')?.setValue(this.projectToEdit.endDate);
  }

  saveTFR() {
    // take data from tfrDetails and combine with residual info from selected project id
    let updatedProjectDetails: ProjectBasicDetails = {
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      vendorId: this.tfrDetails.get('vendorId')?.value,
      vendorSpecific: this.vendorSpecificData,
      status: this.editMode ? this.projectToEdit.status : 'DRAFT',
    };

    this.tfrManager.setBasicDetails(updatedProjectDetails);
  }

  onVendorSelect(vendor: Vendor) {
    console.log(this.tfrDetails);
    this.tfrDetails.get('vendorId')?.setValue(vendor.id);
  }

  next() {
    this.saveTFR();
    this.nextStepEmitter.emit(true);
    this.stepCompletedEmitter.emit(true);
  }

  onAttributesSelected(attributes: VendorAttribute[]) {
    this.attributeNames = [];
    attributes.forEach((att) => {
      this.attributeNames.push(att.attributeName);
    });
  }

  onAttributesUpdated(group: FormGroup) {
    this.vendorAttributes = group;
    this.updateVendorSpecific();
  }

  updateVendorSpecific() {
    // convert the form group info to string data and assign to vendorSpecificData string
    if (this.vendorAttributes.valid) {
      this.vendorSpecificData = '{';
      let i = 0;
      while (i < this.attributeNames.length) {
        if (i > 0) {
          this.vendorSpecificData = this.vendorSpecificData.concat(', ');
        }
        this.vendorSpecificData = this.vendorSpecificData.concat(
          '"' +
            this.attributeNames[i] +
            '": "' +
            this.getAttributesArray().controls[i].value +
            '"'
        );
        i += 1;
      }
      this.vendorSpecificData = this.vendorSpecificData.concat('}');
    }
  }

  getAttributesArray() {
    return this.vendorAttributes.controls['attributeValues'] as FormArray;
  }
}
