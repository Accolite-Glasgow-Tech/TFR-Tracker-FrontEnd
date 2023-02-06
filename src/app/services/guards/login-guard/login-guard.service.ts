import { Injectable, Type } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { userService } from '../../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router, private userService: userService) {}

  /**
   * Allows activation if User is logged in OR if guarding is disabled
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
    return this.userService.isLoggedIn() || environment.routeGuardingDisabled;
  }
}
