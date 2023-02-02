import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { userService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuardService implements CanActivate {

  constructor(private router: Router,
    private userService: userService) {}

  /**
   * Allows activation if User is logged out OR if guarding is disabled
   */
  canActivate(): boolean {
    let activated = this.checkIfComponentCanBeActivated();
    if (!activated) {
      console.log('called');
      this.navigateToValid();
    }
    return activated;
  }

  navigateToValid() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  checkIfComponentCanBeActivated(): boolean {
    return (
      !this.userService.isLoggedIn() ||
      environment.routeGuardingDisabled
    );
  }

  get isLoggedIn(): boolean {
    if (typeof sessionStorage.getItem('jwt_token') == 'string') {
      return true;
    }
    return false;
  }
}
