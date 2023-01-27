import { Injectable, Type } from '@angular/core';
import {appRoutes} from '../../app-routes';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardManagerService {

  constructor() { }

  /**
   * returns the associated Route of the provided component type
   */
  private getRouteDataFor(component: Type<any> | undefined) {
    return appRoutes.find((value) => {
      return value.component == component;
    });
  }

  /**
   * returns false if received component has any associated Route Guard that cannot currently activate
   */
  checkRouting(component: Type<any> | undefined): boolean {
    
    let canActivate = true;

    let route = this.getRouteDataFor(component);

    route?.canActivate?.forEach(fn => {
      let guard = new fn();
      if(!guard.checkIfComponentCanBeActivated()){
        canActivate = false;
      }
    });

    return canActivate;

  }
}
