import { Component, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';
import { Project } from 'src/app/types/types';

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
}
