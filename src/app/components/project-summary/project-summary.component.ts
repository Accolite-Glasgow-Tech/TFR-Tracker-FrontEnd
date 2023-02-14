import { Component, Input } from '@angular/core';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import {
  AllocatedResourceTypeDTO,
  MilestoneDTO,
  Project,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent {
  constructor(
    protected resourceService: ResourceService,
    public dateFormatterService: DateFormatterService
  ) {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceTypeDTO[];
  @Input() clientName!: string;

  get currentProjectMilestones(): MilestoneDTO[] {
    return this.milestonesWithoutDeleted(this.currentProject?.milestones);
  }
  milestonesWithoutDeleted(
    milestones: MilestoneDTO[] | undefined
  ): MilestoneDTO[] {
    return !milestones
      ? []
      : milestones.filter((milestone: MilestoneDTO) => !milestone.is_deleted);
  }

  get currentResourcesWithNames(): AllocatedResourceTypeDTO[] {
    return this.resourceService.resourcesWithoutDeleted(
      this.resourcesWithNames
    );
  }
}
