import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vendorProjectCountURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorProjectCountService {
  constructor(private http: HttpClient) {}

  readVendorProjectCountUrlUrl(): Observable<any> {
    return this.http.get(vendorProjectCountURL);
  }
}
