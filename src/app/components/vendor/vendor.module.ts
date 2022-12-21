import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorComponent } from './vendor.component';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [VendorComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  
  exports:[VendorComponent]
})
export class VendorModule { }
