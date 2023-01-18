import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Vendor, VendorAttribute } from '../types/types';
import { DummyData } from '../types/dummy-data';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Vendors: Vendor[] = require('../../assets/json/vendors.json');
  vendorReset = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) {
    console.log('Vendors ', this.Vendors);
  }

  resetVendorDetails() {
    this.vendorReset.emit(true);
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
