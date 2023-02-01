import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MilestoneManagerService } from 'src/app/services/milestone-manager/milestone-manager.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { Milestone, FormMilestone, Project } from 'src/app/shared/interfaces';
import { HttpResponse } from '@angular/common/http';

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
    private snackBarService: SnackBarService
  ) {}
  @Output() nextStepEmitter = new EventEmitter<boolean>();
  @Output() stepCompletedEmitter = new EventEmitter<boolean>();
  isPristine: boolean = true;
  milestones: Milestone[] = this.milestoneManagerService.getMilestones;
  formMilestone: FormMilestone | null = null;
  milestoneForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    acceptance_date: new FormControl<Date | null>(
      this.formMilestone?.acceptance_date ?? null,
      {
        validators: [Validators.required],
      }
    ),
    start_date: new FormControl<Date | null>(
      this.formMilestone?.start_date ?? null,
      {
        validators: [Validators.required],
      }
    ),
    delivery_date: new FormControl<Date | null>(
      this.formMilestone?.delivery_date ?? null,
      {
        validators: [Validators.required],
      }
    ),
  });
  updateObserver = {
    next: () => {
      this.milestones = this.milestoneManagerService.getMilestones;
      this.formMilestone = this.milestoneManagerService.getSelected;
      this.milestoneForm.setValue(this.ConvertMilestoneToFormData());
    },
  };
  get selectedMilestone(): Milestone | null {
    return this.formMilestone as Milestone | null;
  }
  set selectedMilestone(milestone: Milestone | null) {
    this.formMilestone = milestone;
  }
  get submittable(): boolean {
    return this.milestoneManagerService.submittable && this.isPristine;
  }

  putObserver = {
    next: (response: {}) => {
      if (this.projectManagerService.project) {
        this.projectManagerService.project.version = Number(response);
      }
      this.snackBarService.showSnackBar('Updates saved to database', 2000);
      this.isPristine = true;
      this.resetMilestones();
      this.update();
    },
    error: (err: Error) =>
      this.snackBarService.showSnackBar(
        'Update failed, please try again',
        2000
      ),
  };

  getObserver = {
    next: (projectResponse: HttpResponse<Project>) => {
      this.projectManagerService.extractProject(projectResponse);
      this.snackBarService.showSnackBar('Get successful', 2000);
      this.milestoneManagerService.setMilestones(
        this.projectManagerService.getMilestones
      );
      this.update();
    },
    error: (err: Error) =>
      this.snackBarService.showSnackBar('Get failed, please retry', 2000),
  };

  update() {
    this.milestones = this.milestoneManagerService.getMilestones;
    this.formMilestone = this.milestoneManagerService.getSelected;
    this.milestoneForm.setValue(this.ConvertMilestoneToFormData());
  }

  ngOnInit(): void {
    this.milestoneManagerService.Update.subscribe(this.updateObserver);
    this.milestoneManagerService.setMilestones(
      this.projectManagerService.getMilestones
    );
  }
  get getFormMilestone(): FormMilestone | null {
    if (this.formMilestone != null) {
      return Object.assign(this.formMilestone, this.milestoneForm.value);
    }
    throw new Error('milestone not assigned');
  }

  ConvertMilestoneToFormData(): {
    name: string;
    description: string;
    acceptance_date: Date | null;
    start_date: Date | null;
    delivery_date: Date | null;
  } {
    if (this.formMilestone != null) {
      let { name, description, acceptance_date, start_date, delivery_date } =
        this.formMilestone;
      return {
        name,
        description,
        acceptance_date: acceptance_date ?? null,
        start_date: start_date ?? null,
        delivery_date: delivery_date ?? null,
      };
    }
    return {
      name: '',
      description: '',
      acceptance_date: null,
      start_date: null,
      delivery_date: null,
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
    this.milestoneForm.markAsPristine();
  }
  discardSelected() {
    this.milestoneManagerService.setSelected(null);
  }
  saveSelected() {
    this.milestoneManagerService.saveFormMilestone(this.getFormMilestone);
    this.isPristine = false;
  }

  get milestonesNotDeleted() {
    return this.milestoneManagerService.getMilestones.filter(
      (milestone) => !milestone.is_deleted
    );
  }
  removeMilestone(milestone: Milestone) {
    this.milestoneManagerService.updateToRemove(milestone);
    this.isPristine = false;
  }
  selectMilestone(milestone: Milestone) {
    this.milestoneManagerService.setSelected(milestone);
    this.milestoneForm.markAsPristine();
  }
  submitMilestones() {
    this.projectManagerService
      .putMilestones(this.milestoneManagerService.getMilestones)
      .subscribe(this.putObserver);
  }
  resetMilestones() {
    let projectId = this.projectManagerService.getProjectId;
    if (projectId) {
      this.projectManagerService
        .getFromDatabase(projectId)
        .subscribe(this.getObserver);
    } else {
      throw new Error('no project id found on project manager');
    }
  }
  nextStep() {
    this.stepCompletedEmitter.emit(true);
    this.nextStepEmitter.emit(true);
  }
  previousStep() {
    this.nextStepEmitter.emit(false);
  }
  get projectStatus(): string | undefined {
    return this.projectManagerService.project?.status;
  }
}
