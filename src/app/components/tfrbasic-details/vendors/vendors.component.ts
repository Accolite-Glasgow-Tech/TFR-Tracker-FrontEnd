import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  Vendor,
  VendorAttribute,
  ProjectBasicDetails,
} from 'src/app/types/types';
import { ApiService } from 'src/app/services/api.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  constructor(private api: ApiService) {}

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

  fillAttributesFromExisting() {
    // parse values from existingDetails.vendor_specific
    // use to set values of form array
    var obj = JSON.parse(this.existingDetails.vendor_specific);
    let i = 0;
    console.log(this.attributes[0].attribute_name);
    console.log(obj);

    this.attributes.forEach((attribute) => {
      console.log(obj[attribute.attribute_name]);
      this.getAttributes().at(i).setValue(obj[attribute.attribute_name]);
      i += 1;
    });
  }

  @Output() onSelected = new EventEmitter<Vendor>();
  @Output() attributesSelected = new EventEmitter<VendorAttribute[]>();
  onSelectedVendor(vendor: Vendor) {
    this.vendorGroup.get('name')?.setValue(vendor.name);

    console.log(vendor);
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
