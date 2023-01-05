import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Vendor, VendorAttribute } from 'src/app/types/types';
import { ApiService } from 'src/app/services/api.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounce, interval } from 'rxjs';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  constructor(private api: ApiService){}

  vendors!: Vendor[];

  attributes!: VendorAttribute[];
  attributeGroup!: FormGroup;
  

  @Output() onAttributesUpdated = new EventEmitter<FormGroup>();

  ngOnInit(){

    this.api.getVendorData().subscribe(
      (data) => {this.vendors = data;}
    );
    
    this.attributeGroup = new FormGroup({
      attributeValues: new FormArray([])
    });
    
    this.getAttributes().valueChanges.pipe( 
      debounce( () => interval(500) )
      )
    .subscribe(() => {
      this.onAttributesUpdated.emit(this.attributeGroup);
    });
  }

  @Output() onSelected = new EventEmitter<Vendor>();
  @Output() attributesSelected = new EventEmitter<VendorAttribute[]>();
  onSelectedVendor(vendor: Vendor) {

    console.log(vendor);
    this.onSelected.emit(vendor);

    this.api.getVendorAttributes(vendor.id).subscribe((res) => {
      this.attributes = res;
    });

    this.attributesSelected.emit(this.attributes);
  
    this.getAttributes().clear();
    
    //add a form control to form array for each attribute
    this.attributes.forEach((res) => {
      this.getAttributes().push( new FormControl('', [Validators.required]));
    });
  }

  getAttributes(): FormArray {
    return this.attributeGroup.controls["attributeValues"] as FormArray;
  }
}