import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectBasicDetails, Vendor, VendorAttribute } from 'src/app/types/types';

@Component({
  selector: 'app-tfr-basic-details',
  templateUrl: './tfr-basic-details.component.html',
  styleUrls: ['./tfr-basic-details.component.scss'],
})
export class TfrBasicDetailsComponent implements OnInit {
  constructor() {}

  @Output() nextStepEmitter = new EventEmitter<boolean>();

  tfrDetails!: FormGroup;
  projectDetails!: ProjectBasicDetails;
  selectedProject!: ProjectBasicDetails;
  vendorAttributes!: FormGroup;
  attributeNames: String[] = [];
  vendorSpecificData: String = '';

  testProject: ProjectBasicDetails = {
    name: 'Backend',
    startDate: new Date('2022-12-28'),
    endDate: new Date('2022-12-29'),
    vendorId: 1,
    vendorSpecific: '{"key":"value"}',
    status: 'INPROGRESS',
  };

  ngOnInit(): void {
    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      vendorId: new FormControl('', [Validators.required]),
    });
  }

  openInEditMode(project: ProjectBasicDetails): void {
    // TODO get project details from service
    this.selectedProject = project;
    // populate fields with info from provided project
    this.tfrDetails.get('name')?.setValue(project.name);
    this.tfrDetails.get('startDate')?.setValue(project.startDate);
    this.tfrDetails.get('endDate')?.setValue(project.endDate);
  }

  saveTFR() {
    // take data from tfrDetails and combine with residual info from selected project id
    let updatedProject = {
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      vendorId: this.tfrDetails.get('vendorId')?.value,
      vendorSpecific: this.vendorSpecificData,
      status: 'DRAFT',
    };
    console.log(updatedProject)
    // TODO call service to save project
  }

  onVendorSelect(vendor: Vendor) {
    this.tfrDetails.get('vendorId')?.setValue(vendor.id);
    let specific = '{"name":"' + vendor.name + '"}';
    this.tfrDetails.get('vendorSpecific')?.setValue(specific);
    console.log(this.tfrDetails)
  }

  next(){
    this.nextStepEmitter.emit(true);
  }

  onAttributesSelected(attributes: VendorAttribute[]){
    this.attributeNames = [];
    attributes.forEach((att)=> {
      this.attributeNames.push(att.attributeName)
    });
  }

  onAttributesUpdated(group: FormGroup){
    this.vendorAttributes = group;
    this.updateVendorSpecific();
  }

  updateVendorSpecific(){
    // convert the form group info to string data and assign to vendorSpecificData string
    if(this.vendorAttributes.valid){
      this.vendorSpecificData = "{";
      let i = 0;
      while(i < this.attributeNames.length){
        if(i > 0){
          this.vendorSpecificData = this.vendorSpecificData.concat(', ');
        }
        this.vendorSpecificData = this.vendorSpecificData.concat('"' + this.attributeNames[i] + '": "' + 
        this.getAttributesArray().controls[i].value + '"');
        i += 1;
      }
      this.vendorSpecificData = this.vendorSpecificData.concat('}');
    }
  }

  getAttributesArray(){
    return this.vendorAttributes.controls['attributeValues'] as FormArray;
  }
}
