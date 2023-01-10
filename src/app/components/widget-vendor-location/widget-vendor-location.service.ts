import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomPlatform } from 'chart.js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorLocationService {
 
  private TfrLocationCountUrl = 'http://localhost:8080/tfrLocationCount';
  datapoints:any;

  constructor(private http: HttpClient) {
  }

    
   readTfrLocationCountUrl(): Observable<any> {
    return this.http.get(this.TfrLocationCountUrl);
  }
  // constructor(private http: HttpClient) {
  //   this.readTfrLocationCountData().subscribe((data: any) => {});
  // }
  // tfrLocationCount = [
  //   ['loc1', 2],
  //   ['loc2', 34],
  //   ['loc3', 3],
  //   ['loc4', 16],
  //   ['loc5', 5],
  //   ['loc6', 80],
  //   ['loc7', 2],
  //   ['loc9', 5],
  // ];

  // public readTfrLocationCountData(): Observable<any> {
  //   const arr = this.tfrLocationCount;
  //   let datapoints=[];
  //   for (var i = 0; i < arr.length; i++) {
  //     let a = { label: arr[i][0], y: arr[i][1] };
  //     datapoints.push(a);
  //   }
  //   return  of(datapoints);
  // }
}
