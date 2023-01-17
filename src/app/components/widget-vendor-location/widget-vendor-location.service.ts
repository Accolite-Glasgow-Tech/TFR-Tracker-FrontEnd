import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomPlatform } from 'chart.js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorLocationService {
  private TfrLocationCountUrl = 'http://localhost:8080/tfrLocationCount';

  constructor(private http: HttpClient) {}

  readTfrLocationCountUrl(): Observable<any> {
    return this.http.get(this.TfrLocationCountUrl);
  }
}
