import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { Component, OnInit, Type } from '@angular/core';
import { RouteGuardManagerService } from 'src/app/services/route-guard-manager/route-guard-manager.service';
import { appRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    public routeGuardManager: RouteGuardManagerService,
  ) {}

  ngOnInit(): void {}
  appRoutes = appRoutes;
  toggle() {
    this.sidenavToggleService.toggle();
  }

}
