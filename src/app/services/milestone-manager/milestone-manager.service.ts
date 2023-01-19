import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { getMilestonesURL } from 'src/app/shared/utils';
import { Milestone } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class MilestoneManagerService {
  milestones: Milestone[] = [];
  selected: Milestone | null = null;
  @Output() Update: EventEmitter<any> = new EventEmitter();
  constructor(
    private projectManagerService: TfrManagementService,
    private httpClient: HttpClient
  ) {}
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

  submittable() {
    if (this.getMilestones.length >= 1) {
      return true;
    }
    return false;
  }
  resetMilestones() {
    this.milestones = this.projectManagerService.getMilestones
      ? this.projectManagerService.getMilestones
      : [];
    this.broadcastUpdate();
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
  putMilestones(projectId: number | undefined): Observable<{}> {
    return this.httpClient.put(
      getMilestonesURL(projectId!),
      this.getMilestonesForPut,
      {
        responseType: 'json',
      }
    );
  }

  private get getMilestonesForPut() {
    //milestones need to have negative temp id's stripped for sending to db.
    let milestones = this.getMilestones;
    return milestones.map((milestone) => {
      if (milestone.id > 0) {
        return milestone;
      }
      let { id, ...cleanedMilestone } = milestone;
      return cleanedMilestone;
    });
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
