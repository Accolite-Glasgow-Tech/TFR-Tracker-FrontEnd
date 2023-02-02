import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, RegisterResponse } from 'src/app/shared/interfaces';
import { loginURL, registrationURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
