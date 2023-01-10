import { Injectable } from '@angular/core';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { ProjectResolverService } from './services/project-resolver/project-resolver.service';
import { TFRRoute } from './TFRRoute';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  public static RoutesList: TFRRoute[] = [
    {
      label: 'Home',
      path: 'home',
      component: HomeComponent,
    },
    {
      label: 'TFRs',
      path: 'tfrs',
      component: TfrsComponent,
    },
    {
      path: 'tfr/create',
      component: StepperComponent,
    },
    {
      path: 'tfr/:id/edit',
      component: StepperComponent,
      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      path: 'tfr/:id',
      component: TfrComponent,
      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      path: 'tfr',
      component: TfrComponent,
    },
    {
      label: 'Milestones',
      path: 'milestones',
      component: MilestonesComponent,
    },
    {
      label: 'Alerts',
      path: 'alerts',
      component: AlertsComponent,
    },
    {
      label: 'Reports',
      path: 'reports',
      component: ReportsComponent,
    },
    {
      label: 'Permissions',
      path: 'permissions',
      component: PermissionsComponent,
    },

    {
      path: '**',
      redirectTo: 'home',
    },
  ];
}
