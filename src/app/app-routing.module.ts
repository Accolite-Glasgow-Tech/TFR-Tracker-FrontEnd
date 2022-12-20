import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';

export const routes: Routes = [{
  path:'home',component: HomeComponent
},
{
  path:'tfrs',component: TfrsComponent
},
{
  path:'tfrs/id:',component: TfrsComponent
},
{
  path:'milestones',component: MilestonesComponent
},
{
  path:'alerts',component: AlertsComponent
},
{
  path:'reporting',component: ReportingComponent
},
{
  path:'permissions',component: PermissionsComponent
},

{ path: '**', redirectTo:'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
