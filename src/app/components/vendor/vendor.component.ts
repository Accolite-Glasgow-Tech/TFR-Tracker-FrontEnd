import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})

export class VendorComponent implements OnInit {

  vendor: any;
  constructor(private service: ApiserviceService) { }
  ngOnInit() {
    this.service.getVendorData()
      .subscribe(response => {
        this.vendor = response;
        console.log(this.vendor)
      });
  }


  @Output() onSelected = new EventEmitter<any>();
  onSelectedVendor(vend: any) {
    console.log(vend);
    this.onSelected.emit(vend);
  }
}
