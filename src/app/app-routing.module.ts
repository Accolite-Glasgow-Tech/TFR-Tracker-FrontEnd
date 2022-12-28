import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequencyPickerComponent } from './components/frequency-picker/frequency-picker.component';

const routes: Routes = [
  { path: 'reports', component: FrequencyPickerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
