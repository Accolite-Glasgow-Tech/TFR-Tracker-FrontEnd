import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { VendorsComponent } from './components/vendors/vendors.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './components/charts/charts.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartsService } from './components/charts/charts.service';

@NgModule({
  declarations: [AppComponent, VendorsComponent, ChartsComponent],
  providers: [ChartsService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreMaterialModule,
    HttpClientModule,
    NgChartsModule,
  ],
})
export class AppModule {}
