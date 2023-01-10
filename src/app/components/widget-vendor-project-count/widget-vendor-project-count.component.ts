import { Component } from '@angular/core';
import { WidgetVendorProjectCountService } from './widget-vendor-project-count.service';

@Component({
  selector: 'app-widget-vendor-project-count',
  templateUrl: './widget-vendor-project-count.component.html',
  styleUrls: ['./widget-vendor-project-count.component.scss'],
})
export class WidgetVendorProjectCountComponent {
  vendorProjectCountdata: any =[];
  constructor(
    private widgetVendorProjectCountservice: WidgetVendorProjectCountService
  ) {}

  chart: any;

  chartOptions = {
    title: {
      text: 'Project Count VendorWise',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        dataPoints: this.vendorProjectCountdata,
      },
    ],
  };
}
