import { Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { WidgetVendorLocationService } from './widget-vendor-location.service';

@Component({
  selector: 'app-widget-vendor-location',
  templateUrl: './widget-vendor-location.component.html',
  styleUrls: ['./widget-vendor-location.component.scss'],
  providers: [WidgetVendorLocationService],
})
export class WidgetVendorLocationComponent {
  dataPoints: any[] = [];
  constructor(
    private widgetVendorLocationService: WidgetVendorLocationService
  ) {
    this.widgetVendorLocationService
      .readTfrLocationCountUrl()
      .subscribe((response) => {
        this.chartOptions.data[0].dataPoints = response;
        this.dataPoints = response;
      });
  }

  chart: any;
  chartOptions = {
    title: {
    },
    size: 5,
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },

    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        dataPoints: [],
      },
    ],
  };
}
