import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';
import { TfrBasicDetailsService } from 'src/app/services/tfr-basic-details.service';
import { Project, Vendor } from 'src/app/types/types';

@Component({
  selector: 'app-tfrbasic-details',
  templateUrl: './tfrbasic-details.component.html',
  styleUrls: ['./tfrbasic-details.component.scss'],
})
export class TFRBasicDetailsComponent implements OnInit {
  constructor(private tfrService: TfrBasicDetailsService) {}

  tfrDetails!: FormGroup;
  project!: Project;
  editMode!: Boolean;
  selectedProject!: Project;

  testProject: Project = {
    id: 1,
    name: 'Backend',
    startDate: new Date('2022-12-28'),
    endDate: new Date('2022-12-29'),
    version: '0.5',
    vendorId: 1,
    vendorSpecific: '{"key":"value"}',
    status: 'INPROGRESS',
    milestones: [],
    isDeleted: false,
  };

  ngOnInit(): void {
    this.tfrDetails = new FormGroup({
      name: new FormControl('', [Validators.required]),
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      vendorId: new FormControl(''),
      vendorSpecifc: new FormControl(''),
    });

    // this.tfrDetails.valueChanges.pipe(
    //   debounce(()=> interval(500))
    // )
    // .subscribe(
    //   (data) => {console.log(data);}
    // );
  }

  createNewTFR(): void {
    console.log('button clicked');

    // take current values in tfrDetails form group
    this.project = {
      id: NaN,
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      version: '0.5',
      vendorId: 1,
      vendorSpecific: '{"key":"value"}',
      status: 'DRAFT',
      milestones: [],
      isDeleted: false,
    };
    console.log(this.project);

    this.tfrService.addOrUpdateProject(this.project);
  }

  openInEditMode(project: Project): void {
    this.editMode = true;
    this.selectedProject = project;
    // populate fields with info from provided project
    this.tfrDetails.get('name')?.setValue(project.name);
    this.tfrDetails.get('startDate')?.setValue(project.startDate);
    this.tfrDetails.get('endDate')?.setValue(project.endDate);
    
  }

  updateTFR(){
    // take data from tfrDetails and combine with residual info from selected project id
    let updatedProject = {
      id: this.selectedProject.id,
      name: this.tfrDetails.get('name')?.value,
      startDate: this.tfrDetails.get('startDate')?.value,
      endDate: this.tfrDetails.get('endDate')?.value,
      version: this.selectedProject.version,
      // TODO get vendor details from vendor component
      //vendorId: this.tfrDetails.get('vendorId')?.value,
      //vendorSpecific: this.tfrDetails.get('vendorSpecific')?.value,
      vendorId: 1,
      vendorSpecific: '{"key":"value"}',
      status: this.selectedProject.status,
      milestones: this.selectedProject.milestones,
      isDeleted: this.selectedProject.isDeleted,
    };

    this.tfrService.addOrUpdateProject(updatedProject);
  }

  testFormGroup(){
    this.tfrDetails.get('name')?.setValue("test works");
    this.tfrDetails.get('startDate')?.setValue(new Date("2022-12-15"));
    this.tfrDetails.get('endDate')?.setValue(new Date("2022-12-18"));
  }

  switchMode(project: Project){
    if(this.editMode){
      this.editMode = false;
      // set form details to blank
      this.tfrDetails.get('name')?.setValue("");
      this.tfrDetails.get('startDate')?.setValue('');
      this.tfrDetails.get('endDate')?.setValue('');
    }
    else{
      this.openInEditMode(project);
    }
  }

  onVendorSelect(vendor: Vendor){
    this.tfrDetails.get('vendorId')?.setValue(vendor.id);
    this.tfrDetails.get('vendorSpecific')?.setValue('{"name":"' + vendor.name + '"}');
  }
}
