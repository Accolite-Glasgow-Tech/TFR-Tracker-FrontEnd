import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Vendor, VendorAttribute } from 'src/app/types/types';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent {
  constructor(private api: ApiService){}

  @Input() vendors: Vendor[] = [];

  attributes!: VendorAttribute[];

  @Output() onSelected = new EventEmitter<Vendor>();
  onSelectedVendor(vendor: Vendor) {
    console.log(vendor);
    this.onSelected.emit(vendor);

    this.api.getVendorAttributes(vendor.id).subscribe((res) => {
      this.attributes = res;
    });
  
  }
}