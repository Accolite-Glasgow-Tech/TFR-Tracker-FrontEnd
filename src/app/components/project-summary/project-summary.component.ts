import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { ApiService } from 'src/app/services/api.service';
import { AllocatedResourceType, Project } from 'src/app/types/types';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss'],
})
export class ProjectSummaryComponent implements OnInit {
  constructor(
    protected resourceService: ResourceService,
    private apiService: ApiService
  ) {}

  @Input() currentProject!: Project | undefined;
  @Input() resourcesWithNames!: AllocatedResourceType[];
  @Input() vendorSpecificObject!: any;

  ngOnInit(): void {}

  /*
    The vendor details are dynamic. Each vendor has different set of attributes.
    Vendor A can have Department, Super Department values.
    Vendor B can have Cost Center, Department values.
    
    This function dynamically creates the vendor details in the DOM based on the attributes of the 
    specific vendor.
  */
  // cleanVendorDetails() {
  //   if (this.currentProject !== undefined) {
  //     let vendorJSON = JSON.parse(this.currentProject?.vendor_specific || '');
  //     let vendorDiv = document.getElementById('vendor-div');
  //     let vendorDetails = document.getElementById('vendor-details');
  //     vendorDetails?.remove();

  //     vendorDetails = document.createElement('div');
  //     vendorDetails.setAttribute('id', 'vendor-details');

  //     let vendorName: string = '';
  //     this.apiService.getVendorData().subscribe((data) => {
  //       vendorName = data.find(
  //         (vendor) => vendor.id === this.currentProject?.vendor_id
  //       )!.name;
  //       vendorDetails?.appendChild(
  //         this.createVendorDiv('Vendor', vendorName, 0)
  //       );
  //       Object.entries(vendorJSON).forEach((entry, index) => {
  //         const [key, value] = entry;
  //         vendorDetails?.appendChild(
  //           this.createVendorDiv(key, value as string, index + 1)
  //         );
  //       });
  //       vendorDiv?.appendChild(vendorDetails!);
  //     });
  //   }
  // }

  // /*
  //   Creates a div for each vendor attribute to display.
  //   E.g
  //     Vendor: Morgan Stanley
  // */
  // createVendorDiv(key: string, value: string, index: number): HTMLDivElement {
  //   let row = document.createElement('div');
  //   row.style.paddingLeft = '16px';
  //   row.style.paddingTop = index === 0 ? '0px' : '10px';
  //   row.style.paddingBottom = row.style.paddingRight = '10px';
  //   let boldText = document.createElement('strong');
  //   let textValue = document.createElement('span');
  //   boldText.innerText = key + ': ';
  //   textValue.innerText = value as string;
  //   row.appendChild(boldText);
  //   row.appendChild(textValue);
  //   return row;
  // }
}
