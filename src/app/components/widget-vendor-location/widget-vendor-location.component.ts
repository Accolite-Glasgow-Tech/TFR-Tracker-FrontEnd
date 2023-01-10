import { Component } from '@angular/core';
import { WidgetVendorLocationService } from './widget-vendor-location.service';

@Component({
  selector: 'app-widget-vendor-location',
  templateUrl: './widget-vendor-location.component.html',
  styleUrls: ['./widget-vendor-location.component.scss'],
  providers: [WidgetVendorLocationService],
})
export class WidgetVendorLocationComponent {
  constructor(
    private widgetVendorLocationService: WidgetVendorLocationService
  ) {}

  tfrLocationCountdata = [];

  public getTfrLocationCountData() {
    console.log(this.tfrLocationCountdata);
    return this.tfrLocationCountdata;
  }

  chart: any;

  chartOptions = {
    title: {
      text: 'Number of projects locationWise',
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
        dataPoints: this.getTfrLocationCountData(),
      },
    ],
  };
}
