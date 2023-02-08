import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-widget-approaching-projects',
  templateUrl: './widget-approaching-projects.component.html',
  styleUrls: ['./widget-approaching-projects.component.scss'],
})
export class WidgetApproachingProjectsComponent {
  constructor(private apiService: ApiService) {
    this.apiService.getApproachingProjectNames().subscribe((data: any) => {
      this.ProjectDetails = data;
    });
  }

  public ProjectDetails = [];
}
