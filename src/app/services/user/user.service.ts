import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class userService {
  public user_id: any = undefined;
  constructor() {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('jwt_token') !== null;
  }
}
