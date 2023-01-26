import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { vendorsURL } from '../../shared/constants';
import { VendorAttributeDTO, VendorDTO } from '../../shared/interfaces';
import { getVendorAttributesURL } from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  vendorReset = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  resetVendorDetails() {
    this.vendorReset.emit(true);
  }

  getVendorData(): Observable<VendorDTO[]> {
    return this.http.get<VendorDTO[]>(vendorsURL);
  }

  getVendorAttributes(vendor_id: number): Observable<VendorAttributeDTO[]> {
    return this.http.get<VendorAttributeDTO[]>(
      getVendorAttributesURL(vendor_id)
    );
  }
}
