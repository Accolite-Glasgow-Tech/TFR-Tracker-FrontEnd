import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TfrBasicDetailsComponent } from './tfr-basic-details.component';
import { VendorsComponent } from './vendors/vendors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreMaterialModule } from '../../core-modules/core-material/core-material.module'



@NgModule({
  declarations: [
    TfrBasicDetailsComponent,
    VendorsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TfrBasicDetailsComponent,
    VendorsComponent,
    CoreMaterialModule,
  ],
  exports: [TfrBasicDetailsComponent]
})
export class TfrBasicDetailsModule { }
