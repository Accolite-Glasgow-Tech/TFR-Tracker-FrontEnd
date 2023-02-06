import { Component } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { WidgetClientLocationService } from './widget-client-location.service';

@Component({
  selector: 'app-widget-client-location',
  templateUrl: './widget-client-location.component.html',
  styleUrls: ['./widget-client-location.component.scss'],
  providers: [WidgetClientLocationService],
})
export class WidgetClientLocationComponent {
  dataPoints: any[] = [];
  constructor(
    private widgetClientLocationService: WidgetClientLocationService
  ) {
    this.widgetClientLocationService
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
