import { SidenavToggleService } from 'src/app/sidenav-toggle.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesService } from 'src/app/routes.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private sidenavToggleService: SidenavToggleService) {}

  ngOnInit(): void {}
  RoutesList = RoutesService.RoutesList;
  toggle() {
    this.sidenavToggleService.toggle();
  }
}
