import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IStatus } from 'src/app/Interface/Status.Interface';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  //private StatusUrl = 'http://localhost:4200/projects/statusCount';

  constructor(private http: HttpClient) {
    this.readTfrStatusData().subscribe((data) => {});
  }

  // getStatusData(): Observable<any> {
  //   return this.http.get(this.StatusUrl);
  // }

  tfrStatus: IStatus[] = require('../../../assets/json/status.json');
  public readTfrStatusData(): Observable<IStatus[]> {
    return of(this.tfrStatus);
  }
  ngOnInit() {}
}
