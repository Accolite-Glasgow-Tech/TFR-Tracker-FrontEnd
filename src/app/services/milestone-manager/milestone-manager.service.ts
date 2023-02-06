import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormMilestone, Milestone } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MilestoneManagerService {
  milestones: Milestone[] = [];
  selected: FormMilestone | null = null;
  @Output() Update: EventEmitter<void> = new EventEmitter();
  constructor() {}

  get getMilestones(): Milestone[] {
    return this.milestones;
  }
  setMilestones(milestones: Milestone[] | undefined) {
    this.milestones = milestones ? milestones : [];
    this.broadcastUpdate();
  }

  get getSelected(): FormMilestone | null {
    return this.selected;
  }
  setSelected(milestone: FormMilestone | null) {
    this.selected = milestone;
    this.broadcastUpdate();
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

  get MilestonesNotDeletedLength(): number {
    return this.milestones.filter((milestone) => !milestone.is_deleted).length;
  }
  get submittable(): boolean {
    return this.MilestonesNotDeletedLength >= 1;
  }

  selectNewMilestone(projectId: number | undefined) {
    let idOfNew: number = this.generateIdOfNew();
    if (projectId != undefined) {
      this.setSelected({
        project_id: projectId,
        name: '',
        description: '',
        id: idOfNew,
        is_deleted: false,
        status: 'INTENT',
      });
    } else {
      throw new Error('bad project Id passed');
    }
    this.broadcastUpdate();
  }

  saveFormMilestone(milestone: FormMilestone | null) {
    if (this.isSaveable(milestone)) {
      this.remove(milestone as Milestone);
      this.add(milestone as Milestone);
      this.setSelected(null);
    } else {
      throw new Error('bad milestone save');
    }
  }

  isSaveable(milestone: FormMilestone | null): boolean {
    return (
      !!milestone?.acceptance_date &&
      !!milestone?.delivery_date &&
      !!milestone?.start_date &&
      !!milestone?.name
    );
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
  generateIdOfNew() {
    return Math.min(0, ...this.milestones.map((milestone) => milestone.id)) - 1;
  }
}
