import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IVendor } from 'src/app/Interface/Vendor.Interface';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent {
  @Input() vendors: IVendor[] = [];

  @Output() onSelected = new EventEmitter<IVendor>();
  onSelectedVendor(vendor: IVendor) {
    this.onSelected.emit(vendor);
  }
}
