import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { StepperComponent } from './components/stepper/stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TfrCreationResourceComponent } from './components/tfr-creation-resource/tfr-creation-resource.component';

import { HomeComponent } from './components/home/home.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';
import { MilestonesComponent } from './components/milestones/milestones.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TfrComponent } from './components/tfr/tfr.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProjectSummaryComponent } from './components/project-summary/project-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    StepperComponent,
    TfrCreationResourceComponent,
    HomeComponent,
    TfrsComponent,
    MilestonesComponent,
    AlertsComponent,
    ReportsComponent,
    TfrComponent,
    SidenavComponent,
    ToolbarComponent,
    ProjectSummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
