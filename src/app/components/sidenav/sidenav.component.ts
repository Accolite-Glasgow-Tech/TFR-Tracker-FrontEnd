import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/routes.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  RouteList = RoutesService.RouteList;
}
