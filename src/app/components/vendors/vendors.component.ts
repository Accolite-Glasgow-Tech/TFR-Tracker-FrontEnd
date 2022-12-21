import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Vendor } from 'src/app/types/types';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent {
  @Input() vendors: Vendor[] = [];

  @Output() onSelected = new EventEmitter<Vendor>();
  onSelectedVendor(vendor: Vendor) {
    console.log(vendor);
    this.onSelected.emit(vendor);
  }
}