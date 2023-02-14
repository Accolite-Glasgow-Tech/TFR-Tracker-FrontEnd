import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class userService {
  public static user_id: any = undefined;
  public static user_role: any = undefined;
  constructor() {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem('jwt_token') !== null;
  }
}
