import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { TFRRoute } from './shared/interfaces';
import { HomeComponent } from './components/home/home.component';
import { ReportsComponent } from './components/reports/reports.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { UserComponent } from './components/user/user.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ProjectResolverService } from './services/project-resolver/project-resolver.service';

export const appRoutes: TFRRoute[] = [
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
      isGuarded: false,
      path: 'register',
      navigationLabel: 'Register',
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
      path: 'tfr/:id/reports',
      component: ReportsComponent,
    },
    {
      path: '**',
      redirectTo: 'login',
    },
  ];