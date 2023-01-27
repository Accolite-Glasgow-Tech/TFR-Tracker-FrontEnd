import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuardService implements CanActivate {

  constructor(private router: Router) {}

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
    if (this.isLoggedIn) {
      this.router.navigateByUrl('home');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  checkIfComponentCanBeActivated(): boolean {
    return (
      !this.isLoggedIn ||
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
