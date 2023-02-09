import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  serverup = false;
  constructor(private apiService: ApiService) {}

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'left' } },
  };

  pieChartData: any = [];
  pieChartLabels: any[] = [];
  ngOnInit() {
    this.apiService.getTFRStatusCount().subscribe((responsedata: any) => {
      (this.pieChartLabels = Object.keys(JSON.parse(responsedata.response))),
        (this.serverup = true);
      this.pieChartData = [
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
      ];
    });
  }

  onChartClick(event: any) {
    // console.log(event);
  }
}
