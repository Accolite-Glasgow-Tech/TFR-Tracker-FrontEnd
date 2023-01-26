import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { LogoutGuardService } from 'src/app/services/logout-guard/logout-guard.service';
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
      isAccessibleWhenLoggedIn: true,
      navigationLabel: 'Home',
      path: 'home',
      component: HomeComponent,
      canActivate: [LoginGuardService],
    },
    {
      isAccessibleWhenLoggedIn: true,
      navigationLabel: 'Log out',
      path: 'logout',
      component: LogOutComponent,
      canActivate: [LoginGuardService],
    },
    {
      isAccessibleWhenLoggedIn: false,
      path: 'login',
      navigationLabel: 'Login',
      component: UserComponent,
      canActivate: [LogoutGuardService],
    },
    {
      isAccessibleWhenLoggedIn: false,
      path: 'register',
      navigationLabel: 'Register',
      component: UserComponent,
      canActivate: [LogoutGuardService],
    },
    {
      isAccessibleWhenLoggedIn: true,
      navigationLabel: 'TFRs',
      path: 'tfrs',
      component: TfrsComponent,
      canActivate: [LoginGuardService],
    },
    {
      isAccessibleWhenLoggedIn: true,
      path: 'tfr/create',
      component: StepperComponent,
      navigationLabel: 'Create TFR',
      canActivate: [LoginGuardService],
    },
    {
      path: 'tfr/:id/edit',
      component: StepperComponent,
      canActivate: [LoginGuardService],
  
      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      canActivate: [LoginGuardService],
      path: 'tfr/:id',
      component: TfrComponent,
      resolve: {
        project: ProjectResolverService,
      },
    },
    {
      isAccessibleWhenLoggedIn: true,
      canActivate: [LoginGuardService],
      path: 'tfr',
      component: TfrComponent,
    },
    {
      isAccessibleWhenLoggedIn: true,
      canActivate: [LoginGuardService],
      path: 'tfr/:id/reports',
      component: ReportsComponent,
    },
    {
      path: '**',
      redirectTo: 'login',
    },
  ];