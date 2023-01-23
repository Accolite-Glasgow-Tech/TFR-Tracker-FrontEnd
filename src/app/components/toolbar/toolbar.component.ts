import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { Component, OnInit, Type } from '@angular/core';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { RoutesList } from 'src/app/app-routing.module';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    private loginGuardService: LoginGuardService
  ) {}

  ngOnInit(): void {}
  RoutesList = RoutesList;
  toggle() {
    this.sidenavToggleService.toggle();
  }
  checkRouting(component: Type<any> | undefined): boolean {
    if (component) {
      return this.loginGuardService.checkIfComponentCanBeActivated(component);
    }
    return false;
  }
}
