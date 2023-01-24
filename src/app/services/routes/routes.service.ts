import { Injectable } from '@angular/core';
import { FrequencyPickerComponent } from 'src/app/components/frequency-picker/frequency-picker.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { StepperComponent } from 'src/app/components/stepper/stepper.component';
import { TfrComponent } from 'src/app/components/tfr/tfr.component';
import { TfrsComponent } from 'src/app/components/tfrs/tfrs.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { ProjectResolverService } from 'src/app/services/project-resolver/project-resolver.service';
import { TFRRoute } from 'src/app/shared/interfaces';

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
      path: 'login',
      label: 'Login',
      component: UserComponent,
    },
    {
      label: 'TFRs',
      path: 'tfrs',
      component: TfrsComponent,
    },
    {
      path: 'tfr/create',
      component: StepperComponent,
      label: 'Create TFR',
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
      path: 'tfr/:id/reports',
      component: ReportsComponent,
    },
    {
      path: 'picker',
      label: 'Alerts',
      component: FrequencyPickerComponent,
    },

    // {
    //   path: '**',
    //   redirectTo: 'home',
    // },
  ];
}
