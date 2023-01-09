import { Component, OnInit, Input } from '@angular/core';
import { AllocatedResourceType, Project } from 'src/app/types/types';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent implements OnInit {
  constructor() {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceType[];

  ngOnInit(): void {}

  /*
    The vendor details are dynamic. Each vendor has different set of attributes.
    Vendor A can have Department, Super Department values.
    Vendor B can have Cost Center, Department values.
    
    This function dynamically creates the vendor details in the DOM based on the attributes of the 
    specific vendor.
  */
  cleanVendorDetails() {
    if (this.currentProject !== undefined) {
      let vendorJSOn = JSON.parse(this.currentProject?.vendor_specific || '');
      let vendorDiv = document.getElementById('vendor-div');
      let vendorDetails = document.getElementById('vendor-details');
      vendorDetails?.remove();

      vendorDetails = document.createElement('div');
      vendorDetails.setAttribute('id', 'vendor-details');

      Object.entries(vendorJSOn).forEach((entry, index) => {
        const [key, value] = entry;
        let row = document.createElement('div');
        row.style.paddingLeft = '16px';
        row.style.paddingTop = index === 0 ? '0px' : '10px';
        row.style.paddingBottom = row.style.paddingRight = '10px';
        let boldText = document.createElement('strong');
        let textValue = document.createElement('span');
        boldText.innerText = key + ': ';
        textValue.innerText = value as string;
        row.appendChild(boldText);
        row.appendChild(textValue);
        vendorDetails?.appendChild(row);
      });
      vendorDiv?.appendChild(vendorDetails!);
    }
  }
}
