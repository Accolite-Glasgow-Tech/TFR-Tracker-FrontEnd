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

  public getTfrStatusData(): IStatus[] {
    this.chartservice.readTfrStatusData().subscribe((response) => {
      this.tfrstatusdata = response;
    });
    return this.tfrstatusdata;
  }

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  pieChartData: any = [
    {
      backgroundColor: [],
      data: [],
    },
  ];

  pieChartLabels: any[] = Object.keys(this.getTfrStatusData());

  ngOnInit() {
    this.pieChartData = [
      {
        data: Object.values(this.getTfrStatusData()),
        backgroundColor: ['orange', 'Grey', 'red', 'green', 'yellow', 'blue'],
      },
    ];
  }

  onChartClick(event: any) {
    console.log(event);
  }
}
