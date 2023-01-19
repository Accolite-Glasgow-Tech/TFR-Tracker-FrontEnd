import { Component } from '@angular/core';
import { WidgetApproachingProjectsService } from './widget-approaching-projects.service';

@Component({
  selector: 'app-widget-approaching-projects',
  templateUrl: './widget-approaching-projects.component.html',
  styleUrls: ['./widget-approaching-projects.component.scss']
})
export class WidgetApproachingProjectsComponent {
  constructor(private widgetApproachingProjectsService: WidgetApproachingProjectsService) {
    this.widgetApproachingProjectsService.readApproachingProjectNamesData().subscribe((data) => {
    this.ProjectDetails =data});
  }

  public ProjectDetails=[
  ]

}