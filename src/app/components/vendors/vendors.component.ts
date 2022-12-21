import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { Vendor } from 'src/app/types/types';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent {

  @Input() vendors:Vendor[]=[];
  // constructor(private service: ApiserviceService) { }
  // ngOnInit() {
  //   this.service.getVendorData()
  //     .subscribe(response => {
  //       this.vendor = response;
  //       console.log(this.vendor)
  //     });
  //}


   @Output() onSelected = new EventEmitter<Vendor>();
  onSelectedVendor(vendor: Vendor) {
    console.log(vendor);
    this.onSelected.emit(vendor);
  }
}
