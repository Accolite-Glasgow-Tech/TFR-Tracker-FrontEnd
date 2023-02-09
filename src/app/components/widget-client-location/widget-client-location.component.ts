import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-widget-client-location',
  templateUrl: './widget-client-location.component.html',
  styleUrls: ['./widget-client-location.component.scss'],
})
export class WidgetClientLocationComponent {
  dataPoints: any[] = [];
  constructor(private apiService: ApiService) {
    this.apiService.getTFRLocationCount().subscribe((response: any) => {
      this.chartOptions.data[0].dataPoints = response;
      this.dataPoints = response;
    });
  }

  chart: any;
  chartOptions = {
    title: { text: 'Number of TFRs in each location' },
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
