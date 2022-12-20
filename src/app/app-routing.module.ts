import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TfrsComponent } from './components/tfrs/tfrs.component';

export const routes: Routes = [{
  path:'home',component: HomeComponent
},
{
  path:'tfrs',component: TfrsComponent
},

{ path: '**', redirectTo:'home' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
