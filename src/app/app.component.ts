import { Component } from '@angular/core';
import { ApiserviceService } from 'src/app/service/apiservice.service';
import { Vendor } from 'src/app/types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  vendors: Vendor[] = [];

  // title = 'TFR-Management';
  constructor(private service: ApiserviceService) {}
  ngOnInit() {
    this.service.getVendorData().subscribe((response) => {
      this.vendors = response;
      console.log(this.vendors);
    });
  }
  onVendorSelected(vendor: Vendor) {
    console.log(vendor);
  }
}
