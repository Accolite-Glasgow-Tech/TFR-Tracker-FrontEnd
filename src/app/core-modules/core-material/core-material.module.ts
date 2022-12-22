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
import {
  MatStepperModule
} from '@angular/material/stepper';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports:      [
    BrowserModule, FormsModule, FlexLayoutModule, BrowserAnimationsModule,
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
    CommonModule, MatStepperModule, MatFormFieldModule,MatInputModule,MatChipsModule,MatSelectModule
  ],
  exports:[
    FlexLayoutModule,
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatStepperModule, MatFormFieldModule,MatInputModule,MatChipsModule,MatSelectModule
  ]
})
export class CoreMaterialModule { }
