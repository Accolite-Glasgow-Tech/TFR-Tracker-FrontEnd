import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorProjectCountService {
  // constructor(private http: HttpClient) {
  //   this.readTfrLocationCountData().subscribe((data: any) => {});
  // }
  //private TfrLocationCountUrl = 'http://localhost:4200/tfrLocationCount';

  constructor(private http: HttpClient) {
    this.readVendorProjectCountData().subscribe((data: any) => {});
  }
  vendorProjectCount = [
    ['BOA', 3],
    ['HSBC', 4],
    ['AMAZ',6],
    ['JP Morgan', 6],
    ['Morgan Stanley', 9],
    ['Santander', 11],
  ];

  public readVendorProjectCountData(): Observable<any> {
    const arr = this.vendorProjectCount;
    let datapoints = [];
    for (var i = 0; i < arr.length; i++) {
      let a = { label: arr[i][0], y: arr[i][1] };
      datapoints.push(a);
    }
    return of(datapoints);
  }
}
