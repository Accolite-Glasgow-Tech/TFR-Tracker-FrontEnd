import { Component, Input, OnInit, Type } from '@angular/core';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';
import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import { appRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor(
    private sidenavToggleService: SidenavToggleService,
    private loginGuardService: LoginGuardService
  ) {}
  @Input()
  appRoutes = appRoutes;
  isOpen = false;
  ngOnInit(): void {
    this.sidenavToggleService.toggleEmitter.subscribe(() => {
      this.isOpen = !this.isOpen;
    });
  }
  checkRouting(component: Type<any> | undefined): boolean {
    if (component) {
      return this.loginGuardService.checkIfComponentCanBeActivated(component);
    }
    return false;
  }
}
