import { SidenavToggleService } from 'src/app/services/sidenav-toggle/sidenav-toggle.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  Type,
} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { LoginGuardService } from 'src/app/services/login-guard/login-guard.service';

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
  RoutesList = RoutesService.RoutesList;
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
