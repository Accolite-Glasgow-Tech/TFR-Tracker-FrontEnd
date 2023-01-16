import { EventEmitter, Injectable, Output } from '@angular/core';
import { Milestone } from 'src/app/types/types';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { HttpClient } from '@angular/common/http';
import { APPCONSTANTS } from 'src/app/shared/app.constants';
import { Observable } from 'rxjs';

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
  resetMilestones() {
    this.milestones = this.projectManagerService.getMilestones
      ? this.projectManagerService.getMilestones
      : [];
    this.broadcastUpdate();
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
  putMilestones(): Observable<{}> {
    let putMilestoneUrl =
      APPCONSTANTS.APICONSTANTS.BASE_URL +
      '/projects/' +
      this.projectManagerService.getProjectId +
      '/milestone/';
    return this.httpClient.put(putMilestoneUrl, this.getMilestonesForPut(), {
      responseType: 'json',
    });
  }

  private getMilestonesForPut() {
    //milestones need to have negative temp id's stripped for sending to db.
    let milestones = this.getMilestones();
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
