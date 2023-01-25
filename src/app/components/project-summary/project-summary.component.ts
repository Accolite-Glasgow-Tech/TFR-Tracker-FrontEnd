import { Component, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AllocatedResourceTypeDTO, Milestone } from 'src/app/shared/interfaces';
import { Project } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent {
  constructor(protected resourceService: ResourceService) {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceTypeDTO[];
  @Input() vendorName!: string;

  get currentProjectMilestones(): Milestone[] {
    console.log(
      this.milestonesWithoutDeleted(this.currentProject?.milestones!)
    );
    return this.milestonesWithoutDeleted(this.currentProject?.milestones);
  }
  milestonesWithoutDeleted(milestones: Milestone[] | undefined): Milestone[] {
    return !milestones
      ? []
      : milestones.filter((milestone: Milestone) => !milestone.is_deleted);
  }
}
