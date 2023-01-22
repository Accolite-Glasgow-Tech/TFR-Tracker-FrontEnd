import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesService } from 'src/app/services/routes/routes.service';

@NgModule({
  imports: [RouterModule.forRoot(RoutesService.RoutesList)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
