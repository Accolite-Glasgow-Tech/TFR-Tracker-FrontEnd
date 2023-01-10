import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Vendor, VendorAttribute } from '../types/types';
import { DummyData } from '../types/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Vendors: Vendor[] = require('../../assets/json/vendors.json');

  constructor(private httpClient: HttpClient) {
    console.log('Vendors ', this.Vendors);
  }
  getVendorData(): Observable<Vendor[]> {
    return of(this.Vendors);
  }

  getVendorAttributes(vendor_id: number): Observable<VendorAttribute[]> {
    let attributes: VendorAttribute[] = [];

    DummyData.dummy.attributes.forEach((attribute) => {
      if (attribute.vendor_id == vendor_id) {
        attributes.push(attribute);
      }
    });
    return of(attributes);
  }
}
