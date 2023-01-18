import { Component } from '@angular/core';
import { WidgetVendorProjectCountService } from './widget-vendor-project-count.service';

@Component({
  selector: 'app-widget-vendor-project-count',
  templateUrl: './widget-vendor-project-count.component.html',
  styleUrls: ['./widget-vendor-project-count.component.scss'],
})
export class WidgetVendorProjectCountComponent {
  dataPoints: any[] = [];
  constructor(
    private widgetVendorProjectCountservice: WidgetVendorProjectCountService
  ) {
    this.widgetVendorProjectCountservice
      .readVendorProjectCountUrlUrl()
      .subscribe((response) => {
        this.chartOptions.data[0].dataPoints = response;
        this.dataPoints = response;
      });
  }

  chart: any;
  chartOptions = {
    title: {
      //  text: "Project Count VS Vendor"
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
