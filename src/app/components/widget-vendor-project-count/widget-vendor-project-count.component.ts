import { Component } from '@angular/core';
import { WidgetVendorProjectCountService } from './widget-vendor-project-count.service';

@Component({
  selector: 'app-widget-vendor-project-count',
  templateUrl: './widget-vendor-project-count.component.html',
  styleUrls: ['./widget-vendor-project-count.component.scss']
})
export class WidgetVendorProjectCountComponent {
  constructor(private widgetVendorProjectCountservice: WidgetVendorProjectCountService) {}
    
  vendorProjectCountdata= [];

  public getVendorProjectCountData() {
    this.widgetVendorProjectCountservice.readVendorProjectCountData().subscribe((response) => {
      this.vendorProjectCountdata = response;
    });
    console.log(this.vendorProjectCountdata)
    return this.vendorProjectCountdata;
  }
  chart: any;

  chartOptions = {
    title:{
      text: "Project Count VendorWise"
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
    },
    data: [{
      type: "bar",
      indexLabel: "{y}",
      dataPoints:  this.getVendorProjectCountData(),
    }]
  }	
}  