import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { userService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class WriteGuard implements CanActivate {
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
    // ADMIN or MANAGER
    if (userService.user_role === undefined) {
      return false;
    }

    for (let i = 0; i < userService.user_role.length; i++) {
      if (userService.user_role[i] === 'ROLE_ADMIN') {
        return true;
      }
    }

    return false;
  }
}
