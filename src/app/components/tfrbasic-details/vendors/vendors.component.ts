import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  Vendor,
  VendorAttribute,
  ProjectBasicDetails,
} from 'src/app/types/types';
import { ApiService } from 'src/app/services/api.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, first, interval } from 'rxjs';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private tfrManagementService: TfrManagementService
  ) {}

  @Input() editMode!: Boolean;
  @Input() existingDetails!: ProjectBasicDetails;

  vendors!: Vendor[];
  attributes!: VendorAttribute[];
  attributeGroup!: FormGroup;
  vendorGroup!: FormGroup;

  @Output() onAttributesUpdated = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.vendorGroup = new FormGroup({
      name: new FormControl(''),
    });

    this.api.vendorReset.subscribe((result) => {
      this.resetVendorControls();
    });

    this.api.getVendorData().subscribe((data) => {
      this.vendors = data;
    });

    this.attributeGroup = new FormGroup({
      attributeValues: new FormArray([]),
    });

    this.getAttributes()
      .valueChanges.pipe(debounce(() => interval(500)))
      .subscribe(() => {
        this.onAttributesUpdated.emit(this.attributeGroup);
      });

    if (this.editMode) {
      console.log('vendor edit mode');
      // TODO fill in details of vendor and Attributes
      // find vendor in list with existingDetails.vendor_id and call select method
      this.vendors.forEach((vendor) => {
        if (vendor.id == this.existingDetails.vendor_id) {
          this.onSelectedVendor(vendor);
        }
      });
      this.fillAttributesFromExisting();
    }
  }

  resetVendorControls() {
    if (
      this.vendorGroup.value.name !== this.tfrManagementService.getVendorName
    ) {
      this.vendorGroup
        .get('name')
        ?.setValue(this.tfrManagementService.getVendorName);
      let previousVendor: Vendor = this.vendors.find(
        (vendor) => vendor.id === this.tfrManagementService.project?.vendor_id
      )!;
      this.onSelectedVendor(previousVendor);
    }
    this.existingDetails = this.tfrManagementService.getBasicDetails!;
    this.fillAttributesFromExisting();
  }

  fillAttributesFromExisting() {
    // parse values from existingDetails.vendor_specific
    // use to set values of form array

    this.attributes.forEach((attribute, index) => {
      this.getAttributes()
        .at(index)
        .setValue(
          this.existingDetails.vendor_specific[attribute.attribute_name]
        );
    });
  }

  @Output() onSelected = new EventEmitter<Vendor>();
  @Output() attributesSelected = new EventEmitter<VendorAttribute[]>();
  onSelectedVendor(vendor: Vendor) {
    this.getAttributes().reset();
    this.vendorGroup.get('name')?.setValue(vendor.name);

    this.onSelected.emit(vendor);

    this.api.getVendorAttributes(vendor.id).subscribe((res) => {
      this.attributes = res;
    });

    this.attributesSelected.emit(this.attributes);

    this.getAttributes().clear();

    //add a form control to form array for each attribute
    this.attributes.forEach((res) => {
      this.getAttributes().push(new FormControl('', [Validators.required]));
    });
  }

  getAttributes(): FormArray {
    return this.attributeGroup.controls['attributeValues'] as FormArray;
  }
}
