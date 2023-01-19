import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ApiService } from 'src/app/services/api.service';
import { Project } from 'src/app/types/types';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

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
  @Input() resourcesWithNames!: AllocatedResourceTypeDTO[];
  @Input() vendorSpecificObject!: any;
  @Input() vendorName!: string;

  ngOnInit(): void {}
}
