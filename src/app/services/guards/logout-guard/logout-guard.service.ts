import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { userService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutGuardService implements CanActivate {
  constructor(private router: Router, private userService: userService) {}

  /**
   * Allows activation if User is logged out OR if guarding is disabled
   */
  canActivate(): boolean {
    let activated = this.checkIfComponentCanBeActivated();
    if (!activated) {
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
    return !this.userService.isLoggedIn() || environment.routeGuardingDisabled;
  }
}
