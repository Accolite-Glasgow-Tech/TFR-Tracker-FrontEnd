import { Component, ViewChild } from '@angular/core';
import { RoutesService } from './routes.service';
import { IGridsterOptions, GridsterComponent } from 'angular2gridster';
import { ChartsComponent } from './components/charts/charts.component';
import { WidgetVendorLocationComponent } from './components/widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorProjectCountComponent } from './components/widget-vendor-project-count/widget-vendor-project-count.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
