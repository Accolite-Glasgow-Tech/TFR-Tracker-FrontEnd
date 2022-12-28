import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { ReportsComponent } from './components/reports/reports.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, ReportsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    MatRadioModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
