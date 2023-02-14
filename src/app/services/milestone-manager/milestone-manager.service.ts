import { EventEmitter, Injectable, Output } from '@angular/core';
import { MilestoneDTO } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class MilestoneManagerService {
  milestones: MilestoneDTO[] = [];
  selected: MilestoneDTO | null = null;
  @Output() Update: EventEmitter<void> = new EventEmitter();
  constructor() {}

  get getMilestones(): MilestoneDTO[] {
    return this.milestones;
  }
  setMilestones(milestones: MilestoneDTO[] | undefined) {
    this.milestones = milestones ? milestones : [];
    this.broadcastUpdate();
  }

  get getSelected(): MilestoneDTO | null {
    return this.selected;
  }
  setSelected(milestone: MilestoneDTO | null) {
    this.selected = milestone;
    this.broadcastUpdate();
  }

  updateToRemove(formMilestone: MilestoneDTO) {
    console.log(this.milestones);
    let milestone = this.findExisting(formMilestone);
    if (milestone == null) {
      throw new Error('no milestone to update');
    }
    this.removeById(milestone.id!);
    milestone.is_deleted = true;
    this.milestones.push(milestone);
    console.log(this.milestones);
    this.broadcastUpdate();
  }
  private findExisting(milestone: MilestoneDTO): MilestoneDTO | null {
    if (!milestone.id) {
      this.noIdError();
    }
    return this.findById(milestone.id!);
  }
  findById(id: number): MilestoneDTO | null {
    return this.milestones.find((milestone) => (milestone.id = id)) ?? null;
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
        possible_status: ['INTENT'],
      });
    } else {
      throw new Error('bad project Id passed');
    }
    this.broadcastUpdate();
  }

  saveMilestone(milestone: MilestoneDTO | null) {
    if (this.isSaveable(milestone)) {
      this.remove(milestone as MilestoneDTO);
      this.add(milestone as MilestoneDTO);
      this.setSelected(null);
      this.broadcastUpdate();
    } else {
      throw new Error('bad milestone save');
    }
  }

  isSaveable(milestone: MilestoneDTO | null): boolean {
    return (
      !!milestone?.acceptance_date &&
      !!milestone?.delivery_date &&
      !!milestone?.start_date &&
      !!milestone?.name &&
      !!milestone?.status
    );
  }

  private add(milestoneToAdd: MilestoneDTO) {
    this.milestones.push(milestoneToAdd);
  }
  private noIdError(): void {
    throw new Error("can't remove milestones without id's");
  }

  private remove(milestoneToRemove: MilestoneDTO) {
    milestoneToRemove.id
      ? this.removeById(milestoneToRemove.id)
      : this.noIdError();
  }
  private removeById(id: number) {
    this.milestones = this.milestones.filter(
      (milestone: MilestoneDTO) => milestone.id != id
    );
  }
  private broadcastUpdate() {
    this.Update.emit();
  }
  generateIdOfNew() {
    return (
      Math.min(0, ...this.milestones.map((milestone) => milestone.id ?? 0)) - 1
    );
  }
}
