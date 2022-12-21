import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Vendor } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  Vendors: Vendor[] = require('../../assets/json/vendors.json');

  constructor(private httpClient: HttpClient) {
    console.log('Vendors ', this.Vendors);
  }
  getVendorData(): Observable<Vendor[]> {
    return of(this.Vendors);
  }
}
