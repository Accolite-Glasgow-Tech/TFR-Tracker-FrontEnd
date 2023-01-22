import { Injectable, Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  CanDeactivate,
} from '@angular/router';
import { RoutesService } from '../routes/routes.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(routesService: RoutesService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkIfComponentCanBeActivated(route.component);
  }

  checkIfComponentCanBeActivated(component: Type<any> | null): boolean {
    let routeData = RoutesService.RoutesList.find((value) => {
      value.component == component;
    });
    if (routeData?.isGuarded == undefined) {
      return true;
    }
    let shouldPass: boolean = this.XOR(!routeData.isGuarded, this.isLoggedIn);
    return shouldPass;
  }

  get isLoggedIn(): boolean {
    if (typeof sessionStorage.getItem('jwt_token') == 'string') {
      return true;
    }
    return false;
  }

  XOR(input1: boolean, input2: boolean): boolean {
    return (input1 && !input2) || (!input1 && input2);
  }
}
