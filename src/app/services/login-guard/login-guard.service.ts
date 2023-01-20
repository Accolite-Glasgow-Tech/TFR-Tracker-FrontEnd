import { Injectable } from '@angular/core';
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let routeData = RoutesService.RoutesList.find((value) => {
      value.component == route.component;
    });
    if (routeData?.isGuarded == undefined) {
      return true;
    }
    let shouldPass: boolean =
      (routeData.isGuarded && !this.isLoggedIn) ||
      (routeData.isGuarded && !this.isLoggedIn);
    return shouldPass;
  }

  get isLoggedIn(): Boolean {
    if (typeof sessionStorage.getItem('jwt_token') == 'string') {
      return true;
    }
    return false;
  }
}
