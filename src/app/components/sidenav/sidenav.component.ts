import { Component, Input, OnInit, Type } from '@angular/core';
import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { appRoutes } from 'src/app/app-routes';
import { RouteGuardManagerService } from 'src/app/services/route-guard-manager/route-guard-manager.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    public routeGuardManager: RouteGuardManagerService,
  ) {}
  @Input()
  appRoutes = appRoutes;
  isOpen = false;
  ngOnInit(): void {
    this.sidenavToggleService.toggleEmitter.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }

}
