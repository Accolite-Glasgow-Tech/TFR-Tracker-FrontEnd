import { Component } from '@angular/core';
import { RoutesService } from './routes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  RouteList = RoutesService.RouteList;
  constructor() {}
  title = 'TFR-Management';

}
