import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { Component, OnInit, Type } from '@angular/core';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { LogoutGuardService } from 'src/app/services/logout-guard/logout-guard.service';
import { appRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    private loginGuardService: LoginGuardService,
    private logoutGuardService: LogoutGuardService
  ) {}

  ngOnInit(): void {}
  appRoutes = appRoutes;
  toggle() {
    this.sidenavToggleService.toggle();
  }

  private getRouteDataFor(component: Type<any> | undefined) {
    return appRoutes.find((value) => {
      return value.component == component;
    });
  }

  checkRouting(component: Type<any> | undefined): boolean {
    
    let route = this.getRouteDataFor(component);

    if (route?.isAccessibleWhenLoggedIn) {
      return this.loginGuardService.checkIfComponentCanBeActivated();
    }
    
    return this.logoutGuardService.checkIfComponentCanBeActivated();
  }
}
