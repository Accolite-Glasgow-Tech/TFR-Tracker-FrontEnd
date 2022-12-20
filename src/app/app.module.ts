import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { HomeComponent } from './components/home/home.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { TfrComponent } from './components/tfr/tfr.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TfrsComponent,
    MilestonesComponent,
    AlertsComponent,
    ReportingComponent,
    TfrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
