import { inject, Injectable } from '@angular/core';
import { FrequencyPickerComponent } from 'src/app/components/frequency-picker/frequency-picker.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { TfrComponent } from 'src/app/components/tfr/tfr.component';
import { TfrsComponent } from 'src/app/components/tfrs/tfrs.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ProjectResolverService } from 'src/app/services/project-resolver/project-resolver.service';
import { TFRRoute } from 'src/app/shared/interfaces';
import { LoginGuardService } from '../login-guard/login-guard.service';

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  public static RoutesList: TFRRoute[] = [
    {
      label: 'Home',
      path: 'home',
      component: HomeComponent,
      isGuarded: true,
      canActivate: [LoginGuardService],
    },
    {
      isGuarded: false,
      path: 'login',
      label: 'Login',
      component: UserComponent,
      canActivate: [LoginGuardService],
    },
    {
      isGuarded: true,

      label: 'TFRs',
      path: 'tfrs',
      component: TfrsComponent,
      canActivate: [LoginGuardService],
    },
    {
      isGuarded: true,

      path: 'tfr/create',
      component: StepperComponent,
      label: 'Create TFR',
      canActivate: [LoginGuardService],
    },
    {
      isGuarded: true,

      path: 'tfr/:id/edit',
      component: StepperComponent,
      canActivate: [LoginGuardService],

      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      isGuarded: true,
      canActivate: [LoginGuardService],

      path: 'tfr/:id',
      component: TfrComponent,
      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      isGuarded: true,
      canActivate: [LoginGuardService],

      path: 'tfr',
      component: TfrComponent,
    },
    {
      isGuarded: true,
      canActivate: [LoginGuardService],

      label: 'Reports',
      path: 'reports',
      component: ReportsComponent,
    },
    {
      isGuarded: true,
      canActivate: [LoginGuardService],

      path: 'picker',
      label: 'Alerts',
      component: FrequencyPickerComponent,
    },

    {
      path: '**',
      redirectTo: 'home',
    },
  ];
}
