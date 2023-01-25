import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { getMilestonesURL } from 'src/app/shared/utils';
import { Milestone } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MilestoneManagerService {
  milestones: Milestone[] = [];
  selected: Milestone | null = null;
  @Output() Update: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) {}
  get getMilestones() {
    return this.milestones;
  }
  setMilestones(milestones: Milestone[] | undefined) {
    this.milestones = milestones ? milestones : [];
    this.broadcastUpdate();
  }
  setSelected(milestone: Milestone | null) {
    this.selected = milestone;
    this.broadcastUpdate();
  }
  get getSelected(): Milestone | null {
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

  get submittable(): boolean {
    return this.getMilestones.length >= 1;
  }

  selectNewMilestone(projectId: number | undefined) {
    let idOfNew: number = this.generateIdOfNew();
    if (projectId != undefined) {
      this.selected = {
        project_id: projectId,
        delivery_date: new Date(),
        acceptance_date: new Date(),
        start_date: new Date(),
        description: '',
        id: idOfNew,
        is_deleted: false,
      };
    } else {
      throw new Error('bad project Id passed');
    }
    this.broadcastUpdate();
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
