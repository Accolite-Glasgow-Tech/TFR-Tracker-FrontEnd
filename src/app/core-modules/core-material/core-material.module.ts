import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


const materialModules = [
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule,
  FlexLayoutModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  // MatPaginatorIntl,
  MatPaginatorModule,
  MatSortModule,
];


@NgModule({
  declarations: [],
  // providers: [{provide: MatPaginatorIntl, useClass: MatPaginatorIntl}],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    materialModules,
  ],
  exports: [
    materialModules,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  


})
export class CoreMaterialModule {}
