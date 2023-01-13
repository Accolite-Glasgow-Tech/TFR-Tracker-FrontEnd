import { EventEmitter, Injectable, Output } from '@angular/core';
import { Milestone } from 'src/app/types/types';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

@Injectable({
  providedIn: 'root',
})
export class MilestoneManagerService {
  milestones: Milestone[] = [];
  selected: Milestone | null = null;
  @Output() Update: EventEmitter<any> = new EventEmitter();
  constructor(private projectManagerService: TfrManagementService) {}
  getMilestones() {
    return this.milestones;
  }
  setSelected(milestone: Milestone | null) {
    this.selected = milestone;
    this.broadcastUpdate();
  }
  getSelected(): any {
    return this.selected;
  }

  updateToRemove(milestone: Milestone) {
    this.remove(milestone);
    milestone.is_deleted = true;
    this.milestones.push(milestone);
    this.broadcastUpdate();
  }
  saveMilestone(milestoneToAdd: Milestone | null) {
    if (milestoneToAdd != null) {
      this.remove(milestoneToAdd);
      this.add(milestoneToAdd);
      this.setSelected(null);
    }
    this.broadcastUpdate();
  }

  submittable() {
    if (this.getMilestones().length >= 1) {
      return true;
    }
    return false;
  }

  selectNewMilestone() {
    let idOfNew: number = this.generateIdOfNew();
    if (!this.projectManagerService.getProjectId)
      this.selected = {
        project_id: this.projectManagerService.getProjectId
          ? this.projectManagerService.getProjectId
          : NaN,
        delivery_date: new Date(),
        acceptance_date: new Date(),
        start_date: new Date(),
        description: '',
        id: idOfNew,
        is_deleted: false,
      };
    this.broadcastUpdate();
  }
  submitMilestones() {
    this.projectManagerService.setMilestones(this.milestones);
  }

  private add(milestoneToAdd: Milestone) {
    this.milestones.push(milestoneToAdd);
  }
  private remove(milestoneToRemove: Milestone) {
    this.milestones = this.milestones.filter(
      (value: Milestone) => milestoneToRemove.id != value.id
    );
  }
  private broadcastUpdate() {
    this.Update.emit();
  }
  private generateIdOfNew() {
    return Math.min(0, ...this.milestones.map((milestone) => milestone.id)) - 1;
  }
}
