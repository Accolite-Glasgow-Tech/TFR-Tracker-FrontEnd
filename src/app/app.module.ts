import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { TFRBasicDetailsModule } from './components/tfrbasic-details/tfrbasic-details.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TfrsComponent,
    MilestonesComponent,
    AlertsComponent,
    ReportsComponent,
    TfrComponent,
    SidenavComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    TFRBasicDetailsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
