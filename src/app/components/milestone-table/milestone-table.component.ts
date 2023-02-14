import { Component, Input } from '@angular/core';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { MilestoneDTO } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-milestone-table',
  templateUrl: './milestone-table.component.html',
  styleUrls: ['./milestone-table.component.scss'],
})
export class MilestoneTableComponent {
  @Input() milestones!: MilestoneDTO[];

  constructor(
    protected resourceService: ResourceService,
    public dateFormatterService: DateFormatterService
  ) {}
}
