import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectResolverService } from 'src/app/services/project-resolver/project-resolver.service';
import { TFRRoute } from 'src/app/shared/interfaces';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';

import { FrequencyPickerComponent } from 'src/app/components/frequency-picker/frequency-picker.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { TfrComponent } from 'src/app/components/tfr/tfr.component';
import { TfrsComponent } from 'src/app/components/tfrs/tfrs.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { LogOutComponent } from './components/log-out/log-out.component';

export const RoutesList: TFRRoute[] = [
  {
    navigationLabel: 'Home',
    path: 'home',
    component: HomeComponent,
    isGuarded: true,
    canActivate: [LoginGuardService],
  },
  {
    navigationLabel: 'Log out',
    path: 'logout',
    component: LogOutComponent,
    isGuarded: true,
    canActivate: [LoginGuardService],
  },
  {
    isGuarded: false,
    path: 'login',
    navigationLabel: 'Login',
    component: UserComponent,
    canActivate: [LoginGuardService],
  },
  {
    isGuarded: true,

    navigationLabel: 'TFRs',
    path: 'tfrs',
    component: TfrsComponent,
    canActivate: [LoginGuardService],
  },
  {
    isGuarded: true,

    path: 'tfr/create',
    component: StepperComponent,
    navigationLabel: 'Create TFR',
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

    navigationLabel: 'Reports',
    path: 'reports',
    component: ReportsComponent,
  },
  {
    isGuarded: true,
    canActivate: [LoginGuardService],

    path: 'picker',
    navigationLabel: 'Alerts',
    component: FrequencyPickerComponent,
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(RoutesList)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
