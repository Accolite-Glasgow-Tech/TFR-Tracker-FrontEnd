import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VendorAttributeDTO, VendorDTO } from '../shared/interfaces';
import { log } from '../shared/utils';
import { DummyData } from '../types/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  Vendors: VendorDTO[] = require('../../assets/json/vendors.json');
  vendorReset = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) {
    log('Vendors ', this.Vendors);
  }

  resetVendorDetails() {
    this.vendorReset.emit(true);
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
