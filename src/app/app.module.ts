import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { VendorsComponent } from './components/vendors/vendors.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './components/charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsService } from './components/charts/charts.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WidgetVendorLocationComponent } from './components/widget-vendor-location/widget-vendor-location.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { WidgetVendorLocationService } from './components/widget-vendor-location/widget-vendor-location.service';
import { FormsModule } from '@angular/forms';
import { GridsterModule } from 'angular2gridster';
import { WidgetVendorProjectCountComponent } from './components/widget-vendor-project-count/widget-vendor-project-count.component';
import { WidgetVendorProjectCountService } from './components/widget-vendor-project-count/widget-vendor-project-count.service';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    VendorsComponent,
    ChartsComponent,
    ToolbarComponent,
    WidgetVendorLocationComponent,
    CanvasJSChart,
    WidgetVendorProjectCountComponent,
  ],
  providers: [ChartsService, WidgetVendorLocationService, WidgetVendorProjectCountService],
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
    GridsterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule {}
