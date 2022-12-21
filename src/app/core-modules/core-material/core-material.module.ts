import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatSidenavModule
} from '@angular/material/sidenav';
import {
  MatToolbarModule
} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';

const materialModules = [MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
  MatSelectModule,FlexLayoutModule]

@NgModule({
  declarations: [],
  imports:  [BrowserModule, FormsModule, BrowserAnimationsModule,CommonModule,
    materialModules],
  exports:[
    materialModules
  ]
})
export class CoreMaterialModule { 

}
