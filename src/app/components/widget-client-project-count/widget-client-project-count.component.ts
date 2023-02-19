import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-widget-client-project-count',
  templateUrl: './widget-client-project-count.component.html',
  styleUrls: ['./widget-client-project-count.component.scss'],
})
export class WidgetClientProjectCountComponent {
  dataPoints: any[] = [];
  serverup = false;
  constructor(private apiService: ApiService) {
    this.apiService.getClientProjectCount().subscribe((response) => {
      this.chartOptions.data[0].dataPoints = response;
      this.dataPoints = response;
      this.serverup = true;
    });
  }

  chart: any;
  chartOptions = {
    title: {
      text: 'Number of TFRs with each client',
      fontFamily: 'Roboto',
    },
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
