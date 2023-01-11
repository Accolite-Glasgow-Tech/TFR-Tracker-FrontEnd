import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { IStatus } from 'src/app/Interface/Status.Interface';
import { ChartsService } from './charts.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [ChartsService],
})
export class ChartsComponent implements OnInit {
  constructor(private chartservice: ChartsService) {}

  tfrstatusdata: IStatus[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  pieChartData: any = [
    {
      backgroundColor: [],
      data: [],
    },
  ];
  pieChartLabels: any[] = [];
  ngOnInit() {

    this.chartservice.readTfrStatusData().subscribe((response) => {
      this.tfrstatusdata = response;
      (this.pieChartLabels = Object.keys(response)),
        (this.pieChartData = [
          {
            data: Object.values(response),
            backgroundColor: [
              'orange',
              'Grey',
              'red',
              'green',
              'yellow',
              'blue',
            ],
          },
        ]);
    });
  }

  onChartClick(event: any) {
    console.log(event);
  }
}
