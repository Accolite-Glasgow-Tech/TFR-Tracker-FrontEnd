import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ApiService } from 'src/app/services/api.service';
import { AllocatedResourceType, Project } from 'src/app/types/types';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent implements OnInit {
  constructor(
    protected resourceService: ResourceService,
    private apiService: ApiService
  ) {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceType[];
  @Input() vendorSpecificObject!: any;
  @Input() vendorName!: string;

  ngOnInit(): void {}
}
