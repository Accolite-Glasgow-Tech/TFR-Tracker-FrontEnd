import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import {
  ProjectBasicDetails,
  VendorAttributeDTO,
  VendorDTO,
} from 'src/app/shared/interfaces';

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

  vendors!: VendorDTO[];
  attributes!: VendorAttributeDTO[];
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
      if (this.editMode) {
        // TODO fill in details of vendor and Attributes
        // find vendor in list with existingDetails.vendor_id and call select method
        this.vendors.forEach((vendor) => {
          if (vendor.id == this.existingDetails.vendor_id) {
            this.onSelectedVendor(vendor);
          }
        });
      }
    });

    this.vendorGroup = new FormGroup({
      name: new FormControl(''),
      attributeValues: new FormArray([]),
    });

    this.getAttributes()
      .valueChanges.pipe(debounce(() => interval(500)))
      .subscribe(() => {
        this.onAttributesUpdated.emit(this.vendorGroup);
      });
  }

  resetVendorControls() {
    if (
      this.vendorGroup.value.name !== this.tfrManagementService.getVendorName
    ) {
      this.vendorGroup
        .get('name')
        ?.setValue(this.tfrManagementService.getVendorName);
      let previousVendor: VendorDTO = this.vendors.find(
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

    if (this.attributes) {
      this.attributes.forEach((attribute, index) => {
        this.getAttributes()
          .at(index)
          .setValue(
            this.existingDetails.vendor_specific[attribute.attribute_name]
          );
      });
    }
  }

  @Output() onSelected = new EventEmitter<VendorDTO>();
  @Output() attributesSelected = new EventEmitter<VendorAttributeDTO[]>();
  onSelectedVendor(vendor: VendorDTO) {
    this.getAttributes().reset();
    this.vendorGroup.get('name')?.setValue(vendor.name);

    this.onSelected.emit(vendor);

    this.api.getVendorAttributes(vendor.id).subscribe((res) => {
      this.attributes = res;

      this.attributesSelected.emit(this.attributes);

      this.getAttributes().clear();

      //add a form control to form array for each attribute
      this.attributes.forEach((res) => {
        this.getAttributes().push(new FormControl('', [Validators.required]));
      });

      if (
        this.vendorGroup.value.name === this.tfrManagementService.getVendorName
      ) {
        this.fillAttributesFromExisting();
      }
    });
  }

  getAttributes(): FormArray {
    return this.vendorGroup.controls['attributeValues'] as FormArray;
  }
}
