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
   * checks whether received component can currently activate based on its Route Guards
   */
  checkRouting(component: Type<any> | undefined): boolean {
    
    let canActivate = false;

    let route = this.getRouteDataFor(component);

    // currently only checks whether at least one of the guards assigned canActivate
    route?.canActivate?.forEach(fn => {
      let guard = new fn();
      if(guard.checkIfComponentCanBeActivated()){
        canActivate = true;
      }
    });

    return canActivate;

  }
}
