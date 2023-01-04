import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ChartOptions, Colors } from 'chart.js';
import { ChartsService } from './charts.service';
import { ApiService } from 'src/app/service/api.service';
import { Status } from 'src/app/types/types.status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor(
    private httpService: HttpClient,
    private dataObj: ChartsService,
    private service: ApiService
  ) {}

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  pieChartLabels = ['AGREED', 'ARCHIVED', 'DELIVERED', 'DRAFT', 'INPROGRESS'];

  pieChartData: any = [
    {
      backgroundColor: [],
      data: [],
    },
  ];

  // ngOnInit () {
  //     this.httpService.get('../../assets/json/status.json', {responseType: 'json'}).subscribe(
  //         data => {
  //           console.log("tttttttttt ",data)
  //            this.pieChartData=[{
  //            data:[1, 0, 1,2,1],
  //            backgroundColor: ['orange','Grey','red','green','yellow','blue']
  //            }]
  //         },
  //         (err: HttpErrorResponse) => {
  //             console.log (err.message);
  //         }
  //     );
  // }

  ngOnInit() {
    const data1: Observable<Status[]> = this.service.gettfrStatusData();
    console.log('tttttttttt ', data1);
  }

  onChartClick(event: any) {
    console.log(event);
  }
}
