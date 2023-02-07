import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginURL, registrationURL } from 'src/app/shared/constants';
import { LoginResponse, RegisterResponse } from 'src/app/shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class userService {
  public user_id: any = undefined;
  constructor(public httpClient: HttpClient) {}
  register(body: any) {
    return this.httpClient.post<RegisterResponse>(registrationURL, body);
  }
  login(body: any) {
    return this.httpClient.post<LoginResponse>(loginURL, body);
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('jwt_token') !== null;
  }
}
