import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VendorDTO, VendorAttributeDTO } from '../shared/interfaces';
import { DummyData } from '../types/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Vendors: VendorDTO[] = require('../../assets/json/vendors.json');

  constructor(private httpClient: HttpClient) {
    console.log('Vendors ', this.Vendors);
  }
  getVendorData(): Observable<VendorDTO[]> {
    return of(this.Vendors);
  }

  getVendorAttributes(vendor_id: number): Observable<VendorAttributeDTO[]> {
    let attributes: VendorAttributeDTO[] = [];

    DummyData.dummy.attributes.forEach((attribute) => {
      if (attribute.vendor_id == vendor_id) {
        attributes.push(attribute);
      }
    });
    return of(attributes);
  }
}
