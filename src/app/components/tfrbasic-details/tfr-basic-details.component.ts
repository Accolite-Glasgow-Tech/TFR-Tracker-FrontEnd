import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectBasicDetails, Vendor } from 'src/app/types/types';

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
  vendorList: Vendor[] = [{id: 1, name:'vendorA'}, {id: 2, name:'vendorB'}, {id: 3, name:'vendorC'}];
  vendorAttributes!: FormGroup;

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
      vendorSpecific: new FormControl('', [Validators.required]),
    });
  }

  createNewTFR(): void {
    console.log('button clicked');

    // take current values in tfrDetails form group
    this.projectDetails = {
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      vendorId: 1,
      vendorSpecific: '{"key":"value"}',
      status: 'DRAFT',
    };

    console.log(this.projectDetails);

    // call service to update project
  }

  openInEditMode(project: ProjectBasicDetails): void {
    this.selectedProject = project;
    // populate fields with info from provided project
    this.tfrDetails.get('name')?.setValue(project.name);
    this.tfrDetails.get('startDate')?.setValue(project.startDate);
    this.tfrDetails.get('endDate')?.setValue(project.endDate);
  }

  updateTFR() {
    // take data from tfrDetails and combine with residual info from selected project id
    let updatedProject = {
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      // TODO get vendor details from vendor component
      //vendorId: this.tfrDetails.get('vendorId')?.value,
      //vendorSpecific: this.tfrDetails.get('vendorSpecific')?.value,
      vendorId: 1,
      vendorSpecific: '{"key":"value"}',
      status: this.selectedProject.status,
    };

    //this.tfrService.addOrUpdateProject(updatedProject);
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

  onAttributesUpdated(group: FormGroup){
    this.vendorAttributes = group;
  }

}
