import { Injectable, OnInit, Type } from '@angular/core';
import { appRoutes } from '../../app-routes';
import { LoginGuardService } from '../guards/login-guard/login-guard.service';
import { LogoutGuardService } from '../guards/logout-guard/logout-guard.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardManagerService implements OnInit{

  constructor(private loginGuardService: LoginGuardService,
    private logoutGuardService: LogoutGuardService) { 
      this.services = new Array();
      this.services.push(this.loginGuardService);
      this.services.push(this.logoutGuardService);
    }

    services!: any[];

    ngOnInit(): void {
      
    }

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
    let route = this.getRouteDataFor(component);
    let guards: any[] | undefined = route?.canActivate;

    if (guards !== undefined){
      for(let fn of guards){
        for (let service of this.services){
          if(fn.name === service.constructor.name){
            if(!service.checkIfComponentCanBeActivated()){
              return false;
            }
          }
        }
      }
    }
    return true;
  }
}
