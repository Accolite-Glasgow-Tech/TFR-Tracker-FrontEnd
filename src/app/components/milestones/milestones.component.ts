import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MilestoneManagerService } from 'src/app/services/milestone-manager/milestone-manager.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { Milestone } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  providers: [MilestoneManagerService],
})
export class MilestonesComponent implements OnInit {
  constructor(
    private milestoneManagerService: MilestoneManagerService,
    private projectManagerService: TfrManagementService,
    private snackBar: MatSnackBar
  ) {
    this.tfrid = this.projectManagerService.getProjectId ?? NaN;
  }
  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();
  isPristine: boolean = true;
  tfrid: number;
  milestones: any[] = this.milestoneManagerService.getMilestones;
  selectedMilestone: Milestone | null = null;
  submittable: boolean = false;
  milestoneForm = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
    }),
    acceptanceDate: new FormControl<Date>(
      this.projectManagerService.getBasicDetails?.start_date ?? new Date(),
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    startDate: new FormControl<Date>(
      this.projectManagerService.getBasicDetails?.start_date ?? new Date(),
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    deliveryDate: new FormControl<Date>(
      this.projectManagerService.getBasicDetails?.end_date ?? new Date(),
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
  });
  updateObserver = {
    next: () => {
      this.milestones = this.milestoneManagerService.getMilestones;
      this.selectedMilestone = this.milestoneManagerService.getSelected;
      this.milestoneForm.setValue(this.ConvertMilestoneToFormData());
      this.submittable =
        this.milestoneManagerService.submittable() && this.isPristine;
    },
  };

  update() {
    this.milestones = this.milestoneManagerService.getMilestones;
    this.selectedMilestone = this.milestoneManagerService.getSelected;
    this.milestoneForm.setValue(this.ConvertMilestoneToFormData());
    this.submittable =
      this.milestoneManagerService.submittable() && this.isPristine;
  }
  putObserver = {
    next: (x: {}) => {
      this.snackBar.open('Saved milestones to server!', '', {
        duration: 3000,
      });
      this.isPristine = true;
      this.update();
    },
    error: (err: Error) => console.error('Observer got an error: ' + err),
  };
  ngOnInit(): void {
    this.milestoneManagerService.Update.subscribe(this.updateObserver);
    this.milestoneManagerService.setMilestones(
      this.projectManagerService.getMilestones
    );
  }
  get getFormMilestone(): Milestone | null {
    if (this.selectedMilestone != null) {
      return Object.assign(
        this.selectedMilestone,
        this.milestoneForm.getRawValue()
      );
    }
    return null;
  }
  ConvertMilestoneToFormData(): {
    description: string;
    acceptanceDate: Date;
    startDate: Date;
    deliveryDate: Date;
  } {
    if (this.selectedMilestone != null) {
      let {
        description,
        acceptance_date: acceptance_date,
        start_date: start_date,
        delivery_date: delivery_date,
      } = this.selectedMilestone;
      return {
        description,
        acceptanceDate: acceptance_date,
        startDate: start_date,
        deliveryDate: delivery_date,
      };
    }
    return {
      description: '',
      acceptanceDate: new Date(),
      startDate: new Date(),
      deliveryDate: new Date(),
    };
  }

  get getMinDate() {
    return this.projectManagerService.getBasicDetails?.start_date;
  }
  get getMaxDate() {
    return this.projectManagerService.getBasicDetails?.end_date;
  }
  selectNew() {
    this.milestoneManagerService.selectNewMilestone(
      this.projectManagerService.getProjectId
    );
    this.isPristine = false;
  }
  selectExisting(milestone: Milestone) {
    this.milestoneManagerService.setSelected(milestone);
  }
  discardSelected() {
    this.milestoneManagerService.setSelected(null);
  }
  saveSelected() {
    this.milestoneManagerService.saveMilestone(this.getFormMilestone);
    this.isPristine = false;
  }
  removeMilestone(milestone: Milestone) {
    this.milestoneManagerService.updateToRemove(milestone);
  }
  selectMilestone(milestone: Milestone) {
    this.milestoneManagerService.setSelected(milestone);
  }
  submitMilestones() {
    let projectId = this.projectManagerService.getProjectId;
    this.milestoneManagerService
      .putMilestones(projectId)
      .subscribe(this.putObserver);
    this.projectManagerService.setMilestones(
      this.milestoneManagerService.getMilestones
    );
  }
  resetMilestones() {
    this.milestoneManagerService.setMilestones(
      this.projectManagerService.getMilestones
    );
    this.isPristine = true;
  }
  nextStep() {
    this.stepCompletedEmitter.emit(true);
    this.nextStepEmitter.emit(true);
  }
  previousStep() {
    this.nextStepEmitter.emit(false);
  }
}
