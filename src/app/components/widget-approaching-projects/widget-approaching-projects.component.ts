import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { UpcomingProject } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-widget-approaching-projects',
  templateUrl: './widget-approaching-projects.component.html',
  styleUrls: ['./widget-approaching-projects.component.scss'],
})
export class WidgetApproachingProjectsComponent {
  serverup = false;
  UpcomingProjects: UpcomingProject[] = [];

  constructor(private apiService: ApiService) {
    this.apiService.getApproachingProjectNames().subscribe((data: any) => {
      this.UpcomingProjects = data;
      this.serverup = true;
    });
  }
}
