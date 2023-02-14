import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class userService {
  
  constructor() {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('jwt_token') !== null;
  }

  get getUserRole(): any {
    return userService.user_role;
  }
}
