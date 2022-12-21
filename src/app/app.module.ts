import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreMaterialModule } from './core-modules/core-material/core-material.module';
import { VendorModule } from "./components/vendor/vendor.module";

@NgModule({
    declarations: [
        AppComponent    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CoreMaterialModule,
        VendorModule
    ]
})
export class AppModule { }
