import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ChartOptions } from 'chart.js';
import { IStatus } from 'src/app/Interface/Status.Interface';
import { ChartsService } from './charts.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [ChartsService],
})
export class ChartsComponent implements OnInit {
  constructor(private chartservice: ChartsService) {}
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'left' } },
  };

  pieChartData: any = [
    {
      backgroundColor: [],
      data: [],
    },
  ];
  pieChartLabels: any[] = [];
  ngOnInit() {
    this.chartservice.readTfrStatusData().subscribe((responsedata) => {
      (this.pieChartLabels = Object.keys(JSON.parse(responsedata.response))),
        (this.pieChartData = [
          {
            data: Object.values(JSON.parse(responsedata.response)),
            backgroundColor: [
              'orange',
              'blue',
              'red',
              'green',
              'yellow',
              'gray',
              'pink',
              'brown',
            ],
          },
        ]);
    });
  }

  onChartClick(event: any) {
    console.log(event);
  }
}
