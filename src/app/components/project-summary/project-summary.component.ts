import { Component, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AllocatedResourceTypeDTO, Milestone } from 'src/app/shared/interfaces';
import { Project } from 'src/app/shared/interfaces';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service'

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent {
  constructor(protected resourceService: ResourceService,
    public dateFormatterService: DateFormatterService) {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceTypeDTO[];
  @Input() vendorName!: string;

  get currentProjectMilestones(): Milestone[] {
    return this.milestonesWithoutDeleted(this.currentProject?.milestones);
  }
  milestonesWithoutDeleted(milestones: Milestone[] | undefined): Milestone[] {
    return !milestones
      ? []
      : milestones.filter((milestone: Milestone) => !milestone.is_deleted);
  }
}
