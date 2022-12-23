import { NgModule } from '@angular/core';
import { TFRBasicDetailsComponent } from './tfrbasic-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreMaterialModule } from 'src/app/core-modules/core-material/core-material.module';

@NgModule({
  declarations: [
    TFRBasicDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CoreMaterialModule
  ],
  exports: [TFRBasicDetailsComponent]
})
export class TFRBasicDetailsModule { }
