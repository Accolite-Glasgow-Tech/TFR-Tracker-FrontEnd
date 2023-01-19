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
import { ChartsService } from './components/charts/charts.service';
import { WidgetVendorLocationComponent } from './components/widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorLocationService } from './components/widget-vendor-location/widget-vendor-location.service';
import { WidgetVendorProjectCountComponent } from './components/widget-vendor-project-count/widget-vendor-project-count.component';
import { WidgetVendorProjectCountService } from './components/widget-vendor-project-count/widget-vendor-project-count.service';
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
import { TfrBasicDetailsComponent } from './components/tfrbasic-details/tfr-basic-details.component';
import { VendorsComponent } from './components/tfrbasic-details/vendors/vendors.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxListModule, IgxRippleModule } from 'igniteui-angular';
import { ChipComponent } from './components/chip/chip.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserSchedulesComponent } from './components/user-schedules/user-schedules.component';
import { WidgetApproachingProjectsComponent } from './components/widget-approaching-projects/widget-approaching-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    ToolbarComponent,
    WidgetVendorLocationComponent,
    CanvasJSChart,
    WidgetVendorProjectCountComponent,
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
    VendorsComponent,
    ProjectSummaryComponent,
    ResourceTableComponent,
    MilestoneTableComponent,
    TfrCreationDialogComponent,
    UserSchedulesComponent,
    WidgetApproachingProjectsComponent,
    ChipComponent,
    PageNotFoundComponent,
  ],

  providers: [
    ChartsService,
    WidgetVendorLocationService,
    WidgetVendorProjectCountService,
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
