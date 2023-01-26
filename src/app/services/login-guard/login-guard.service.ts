import { Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { appRoutes } from '../../app-routes';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { TFRRoute } from 'src/app/shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let activated = this.checkIfComponentCanBeActivated(route.component);
    if (!activated) {
      console.log('called');
      this.navigateToValid();
    }
    return activated;
  }

  navigateToValid() {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  checkIfComponentCanBeActivated(component: Type<any> | null): boolean {
    let routeData: TFRRoute | undefined = this.getRouteDataFor(component);
    return (
      routeData?.isGuarded == undefined ||
      this.XOR(!routeData.isGuarded, this.isLoggedIn) ||
      environment.routeGuardingDisabled
    );
  }

  private getRouteDataFor(component: Type<any> | null) {
    return appRoutes.find((value) => {
      return value.component == component;
    });
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
