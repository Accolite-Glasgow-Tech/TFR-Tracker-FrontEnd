import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';
import { TfrBasicDetailsService } from 'src/app/services/tfr-basic-details.service';
import { Project } from 'src/app/types/types';

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

    this.tfrService.createNewProject(this.project);
  }

  openInEditMode(project: Project): void {
    this.editMode = true;
    this.selectedProject = project;
    // populate fields with info from provided project
  }

  updateTFR(){
    // take data from tfrDetails and combine with residual info from selected project id
  }
}
