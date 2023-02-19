import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

const AuthorisedRoles: string[] = ['ROLE_PMO', 'ROLE_MANAGER']; // roles that are permitted access

@Injectable({
  providedIn: 'root',
})
export class CreateGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let activate = this.checkIfComponentCanBeActivated();
    if (!activate) {
      this.router.navigateByUrl('/home');
    }
    return activate;
  }

  checkIfComponentCanBeActivated() {
    if (
      sessionStorage.getItem('jwt_token') !== null &&
      sessionStorage['user_role'] !== undefined &&
      AuthorisedRoles.includes(sessionStorage['user_role'])
    ) {
      return true;
    } else {
      return false;
    }
  }
}
