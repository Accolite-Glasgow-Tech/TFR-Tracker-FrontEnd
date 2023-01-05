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
    let vendorJSOn = JSON.parse(this.currentProject?.vendorSpecific || '');
    let vendorDiv = document.getElementById('tab');
    let vendorDetails = document.getElementById('vendor-details');
    vendorDetails?.remove();

    vendorDetails = document.createElement('div');
    vendorDetails.setAttribute('id', 'vendor-details');

    Object.entries(vendorJSOn).forEach((entry) => {
      const [key, value] = entry;
      let attributeSpan = document.createElement('span');
      let boldText = document.createElement('strong');
      boldText.innerText = key + ': ';
      attributeSpan.append(boldText);
      attributeSpan.append(value as string);
      vendorDetails?.append(attributeSpan);
      vendorDetails?.append(document.createElement('br'));
    });
    vendorDiv?.append(vendorDetails);
  }
}
