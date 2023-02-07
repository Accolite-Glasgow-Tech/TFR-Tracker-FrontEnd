import { Component } from '@angular/core';
import { WidgetClientProjectCountService } from '../../services/service-widget-client-project-count/widget-client-project-count.service';

@Component({
  selector: 'app-widget-client-project-count',
  templateUrl: './widget-client-project-count.component.html',
  styleUrls: ['./widget-client-project-count.component.scss'],
})
export class WidgetClientProjectCountComponent {
  dataPoints: any[] = [];
  constructor(
    private widgetClientProjectCountservice: WidgetClientProjectCountService
  ) {
    this.widgetClientProjectCountservice
      .readClientProjectCountUrlUrl()
      .subscribe((response) => {
        this.chartOptions.data[0].dataPoints = response;
        this.dataPoints = response;
      });
  }

  chart: any;
  chartOptions = {
    title: {
      //  text: "Project Count VS Client"
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
