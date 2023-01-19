import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vendorsURL } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    this.getVendorData().subscribe((data) => {});
  }

  getVendorData(): Observable<any> {
    return this.http.get(vendorsURL);
  }
}
