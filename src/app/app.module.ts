import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsComponent } from './components/charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsService } from './components/charts/charts.service';
import { WidgetVendorLocationComponent } from './components/widget-vendor-location/widget-vendor-location.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { WidgetVendorLocationService } from './components/widget-vendor-location/widget-vendor-location.service';
import { GridsterModule } from 'angular2gridster';
import { WidgetVendorProjectCountComponent } from './components/widget-vendor-project-count/widget-vendor-project-count.component';
import { WidgetVendorProjectCountService } from './components/widget-vendor-project-count/widget-vendor-project-count.service';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { StepperComponent } from './components/stepper/stepper.component';
import { TfrCreationResourceComponent } from './components/tfr-creation-resource/tfr-creation-resource.component';

import { HomeComponent } from './components/home/home.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { FrequencyPickerComponent } from './components/frequency-picker/frequency-picker.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { TfrBasicDetailsComponent } from './components/tfrbasic-details/tfr-basic-details.component';
import { VendorsComponent } from './components/tfrbasic-details/vendors/vendors.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';
import { ResourceTableComponent } from './components/resource-table/resource-table.component';
import { MilestoneTableComponent } from './components/milestone-table/milestone-table.component';
import { TfrCreationDialogComponent } from './components/tfr-creation-dialog/tfr-creation-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// import { MatPaginatorIntl } from '@angular/material/paginator';


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
    PageNotFoundComponent,
  ],

  providers: [ChartsService, WidgetVendorLocationService, WidgetVendorProjectCountService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },],
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
   ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
