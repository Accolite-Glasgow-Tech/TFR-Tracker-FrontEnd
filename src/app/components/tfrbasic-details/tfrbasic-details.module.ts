import { NgModule } from '@angular/core';
import { TFRBasicDetailsComponent } from './tfrbasic-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CoreMaterialModule } from 'src/app/core-modules/core-material/core-material.module';

@NgModule({
  declarations: [
    TFRBasicDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CoreMaterialModule
  ],
  exports: [TFRBasicDetailsComponent],
  providers: [MatDatepickerModule]
})
export class TFRBasicDetailsModule { }
