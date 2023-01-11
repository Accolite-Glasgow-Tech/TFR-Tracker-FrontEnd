import { Component, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Milestone } from 'src/app/types/types';

@Component({
  selector: 'app-milestone-table',
  templateUrl: './milestone-table.component.html',
  styleUrls: ['./milestone-table.component.scss'],
})
export class MilestoneTableComponent {
  @Input() milestones!: Milestone[];

  constructor(protected resourceService: ResourceService) {}
}
