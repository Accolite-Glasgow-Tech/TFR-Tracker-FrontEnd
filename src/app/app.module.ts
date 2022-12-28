import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
<<<<<<< HEAD
import { ReportsComponent } from './components/reports/reports.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, ReportsComponent],
=======
import { FrequencyPickerComponent } from './components/frequency-picker/frequency-picker.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    FrequencyPickerComponent
  ],
>>>>>>> d806ef0e7574bd502afb23b715bf31318b83d1d2
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    CoreMaterialModule,
    MatRadioModule,
    MatSelectModule,
=======
    FormsModule,
    ReactiveFormsModule,
    CoreMaterialModule,
    MatFormFieldModule,
    MatSelectModule
>>>>>>> d806ef0e7574bd502afb23b715bf31318b83d1d2
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
