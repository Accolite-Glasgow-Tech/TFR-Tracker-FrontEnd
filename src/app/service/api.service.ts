import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IStatus } from '../Interface/Status.Interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private vendorURL = 'http://localhost:8080/vendors';

  constructor(private http: HttpClient) {
    this.getVendorData().subscribe((data) => {});
  }

  getVendorData(): Observable<any> {
    return this.http.get(this.vendorURL);
  }
}
