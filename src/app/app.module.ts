import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridsterModule } from 'angular2gridster';
import { NgChartsModule } from 'ng2-charts';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { ChartsComponent } from './components/charts/charts.component';
import { WidgetClientProjectCountComponent } from './components/widget-client-project-count/widget-client-project-count.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { StepperComponent } from './components/stepper/stepper.component';
import { TfrCreationResourceComponent } from './components/tfr-creation-resource/tfr-creation-resource.component';

import { DynamicModule } from 'ng-dynamic-component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { FrequencyPickerComponent } from './components/frequency-picker/frequency-picker.component';
import { HomeComponent } from './components/home/home.component';
import { MilestoneTableComponent } from './components/milestone-table/milestone-table.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResourceTableComponent } from './components/resource-table/resource-table.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TfrCreationDialogComponent } from './components/tfr-creation-dialog/tfr-creation-dialog.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { ClientsComponent } from './components/tfrbasic-details/clients/clients.component';
import { TfrBasicDetailsComponent } from './components/tfrbasic-details/tfr-basic-details.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxListModule, IgxRippleModule } from 'igniteui-angular';
import { ChipComponent } from './components/chip/chip.component';
import { ErrorComponent } from './components/error/error.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ManageWidgetModalComponent } from './components/manage-widget-modal/manage-widget-modal.component';
import { NotesDialogComponent } from './components/notes-dialog/notes-dialog.component';
import { UserSchedulesComponent } from './components/user-schedules/user-schedules.component';
import { WidgetApproachingProjectsComponent } from './components/widget-approaching-projects/widget-approaching-projects.component';
import { WidgetClientLocationComponent } from './components/widget-client-location/widget-client-location.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ToolbarComponent,
    CanvasJSChart,
    WidgetClientProjectCountComponent,
    StepperComponent,
    TfrCreationResourceComponent,
    HomeComponent,
    TfrsComponent,
    MilestonesComponent,
    AlertsComponent,
    ReportsComponent,
    TfrComponent,
    SidenavComponent,
    ToolbarComponent,
    UserComponent,
    FrequencyPickerComponent,
    TfrBasicDetailsComponent,
    ClientsComponent,
    ProjectSummaryComponent,
    ResourceTableComponent,
    MilestoneTableComponent,
    TfrCreationDialogComponent,
    UserSchedulesComponent,
    WidgetApproachingProjectsComponent,
    ChipComponent,
    LogOutComponent,
    ManageWidgetModalComponent,
    NotesDialogComponent,
    WidgetClientLocationComponent,
    ErrorComponent,
  ],

  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    GridsterModule.forRoot(),
    GridsterModule,
    ReactiveFormsModule,
    DynamicModule,
    IgxListModule,
    IgxRippleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
