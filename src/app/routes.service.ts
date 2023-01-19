import { Injectable } from '@angular/core';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { UserSchedulesComponent } from './components/user-schedules/user-schedules.component';
import { UserComponent } from './components/user/user.component';
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
      label: 'Reports',
      path: 'reports',
      component: ReportsComponent,
    },
    {
      path: 'schedules',
      component: UserSchedulesComponent,
    },
    {
      path: 'permissions',
      component: PermissionsComponent,
    },

    {
      path: 'login',
      component: UserComponent,
    },

    {
      path: '**',
      redirectTo: 'home',
    },
  ];
}
