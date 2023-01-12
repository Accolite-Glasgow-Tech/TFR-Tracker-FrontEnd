import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { HomeComponent } from './components/home/home.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { FrequencyPickerComponent } from './components/frequency-picker/frequency-picker.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { UserComponent } from './components/user/user.component';
import { RoutesService } from './routes.service';

@NgModule({
  imports: [RouterModule.forRoot(RoutesService.RoutesList)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
