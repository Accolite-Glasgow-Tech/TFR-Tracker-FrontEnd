import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorProjectCountService {
  private VendorProjectCountUrl = 'http://localhost:8080/VendorProjectCount';

  constructor(private http: HttpClient) {}

  readVendorProjectCountUrlUrl(): Observable<any> {
    return this.http.get(this.VendorProjectCountUrl);
  }
}
