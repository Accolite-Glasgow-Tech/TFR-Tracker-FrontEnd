import { Component, OnInit } from '@angular/core';
import { RoutesService } from 'src/app/routes.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  RouteList = RoutesService.RouteList;
}
