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
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports:[
    BrowserModule, FormsModule, FlexLayoutModule, BrowserAnimationsModule,
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule,
    CommonModule, MatStepperModule, MatFormFieldModule,MatInputModule,MatChipsModule,
    MatAutocompleteModule, MatTableModule
  ],
  exports:[
    FlexLayoutModule,
    MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, 
    MatStepperModule, MatFormFieldModule,MatInputModule,MatChipsModule,
    MatAutocompleteModule, 
  ]
})
export class CoreMaterialModule { }
