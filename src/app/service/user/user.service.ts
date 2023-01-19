import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  loginResponse,
  registerResponse,
} from 'src/app/components/user/user.component';
import { loginURL, registrationURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class userService {
  constructor(public httpClient: HttpClient) {}

  register(body: any) {
    return this.httpClient.post<registerResponse>(registrationURL, body);
  }

  login(body: any) {
    return this.httpClient.post<loginResponse>(loginURL, body);
  }
}
