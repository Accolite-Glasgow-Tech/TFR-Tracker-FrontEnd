import { Component, Input, OnInit, Type } from '@angular/core';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { appRoutes } from 'src/app/app-routes';
import { LogoutGuardService } from 'src/app/services/logout-guard/logout-guard.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    private loginGuardService: LoginGuardService,
    private logoutGuardService: LogoutGuardService
  ) {}
  @Input()
  appRoutes = appRoutes;
  isOpen = false;
  ngOnInit(): void {
    this.sidenavToggleService.toggleEmitter.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
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
