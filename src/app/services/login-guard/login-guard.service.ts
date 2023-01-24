import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { RoutesList } from 'src/app/app-routing.module';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkIfComponentCanBeActivated(route.component);
  }

  checkIfComponentCanBeActivated(component: Type<any> | null): boolean {
    let routeData = RoutesList.find((value) => {
      return value.component == component;
    });

    if (routeData?.isGuarded == undefined) {
      return true;
    }
    let shouldPass: boolean = this.XOR(!routeData.isGuarded, this.isLoggedIn);
    if (environment.routeGuardingDisabled == true) {
      return true;
    }
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
