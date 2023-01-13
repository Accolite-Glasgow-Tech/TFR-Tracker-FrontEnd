import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MilestoneManagerService } from 'src/app/services/milestone-manager/milestone-manager.service';
import { Milestone } from 'src/app/types/types';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
  providers: [MilestoneManagerService, TfrManagementService],
})
export class MilestonesComponent implements OnInit {
  constructor(
    private milestoneManagerService: MilestoneManagerService,
    private projectManagerService: TfrManagementService
  ) {
    this.tfrid = this.projectManagerService.getProjectId ?? NaN;
  }
  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();
  tfrid: number;
  milestones: any[] = this.milestoneManagerService.getMilestones();
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
      this.milestones = this.milestoneManagerService.getMilestones();
      this.selectedMilestone = this.milestoneManagerService.getSelected();
      this.milestoneForm.setValue(this.ConvertMilestoneToFormData());
      this.submittable = this.milestoneManagerService.submittable();
    },
  };
  ngOnInit(): void {
    this.milestoneManagerService.Update.subscribe(this.updateObserver);
  }
  getFormMilestone(): Milestone | null {
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
      let { description, acceptance_date, start_date, delivery_date } =
        this.selectedMilestone;
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

  getMinDate() {
    return this.projectManagerService.getBasicDetails?.start_date;
  }
  getMaxDate() {
    return this.projectManagerService.getBasicDetails?.end_date;
  }
  selectNew() {
    this.milestoneManagerService.selectNewMilestone();
  }
  selectExisting(milestone: Milestone) {
    this.milestoneManagerService.setSelected(milestone);
  }
  discardSelected() {
    this.milestoneManagerService.setSelected(null);
  }
  saveSelected() {
    this.milestoneManagerService.saveMilestone(this.getFormMilestone());
  }
  removeMilestone(milestone: Milestone) {
    this.milestoneManagerService.updateToRemove(milestone);
  }
  selectMilestone(milestone: Milestone) {
    this.milestoneManagerService.setSelected(milestone);
  }
  submitMilestones() {
    this.milestoneManagerService.submitMilestones();
    this.nextStepEmitter.emit(true);
  }
}
