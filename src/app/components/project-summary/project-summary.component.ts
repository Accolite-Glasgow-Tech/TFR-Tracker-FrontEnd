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

  cleanVendorDetails() {
    if (this.currentProject !== undefined) {
      let vendorJSOn = JSON.parse(this.currentProject?.vendor_specific || '');
      let vendorDiv = document.getElementById('tab');
      let vendorDetails = document.getElementById('vendor-details');
      vendorDetails?.remove();

      vendorDetails = document.createElement('table');
      vendorDetails.setAttribute('mat-table', '');
      vendorDetails.setAttribute('id', 'vendor-details');
      vendorDetails.style.borderCollapse = 'collapse';

      Object.entries(vendorJSOn).forEach((entry, index) => {
        const [key, value] = entry;
        let row = document.createElement('tr');
        let header = document.createElement('th');
        let data = document.createElement('td');
        // if (index !== 0) {
        //   header.style.borderTop = 'solid 1px #D3D3D3';
        //   data.style.borderTop = 'solid 1px #D3D3D3';
        // }
        header.style.padding = '5px';
        // data.style.borderLeft = 'solid 1px #D3D3D3';
        data.style.padding = '5px';

        header.textContent = key + ':';
        data.textContent = value as string;

        row.appendChild(header);
        row.appendChild(data);
        vendorDetails?.appendChild(row);
      });
      vendorDiv?.appendChild(vendorDetails!);
    }
  }
}
