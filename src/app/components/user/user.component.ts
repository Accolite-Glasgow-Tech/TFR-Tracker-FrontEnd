import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { userService } from 'src/app/services/user/user.service';
import { LoginResponse, RegisterResponse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  registerGroup: any;
  logginGroup: any;
  registering: any = true;
  logging: any = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private responseHandlerService: ResponseHandlerService,
    private snackBarService: SnackBarService
  ) {}
  registerObserver = {
    next: (info: RegisterResponse) => {
      if (info == undefined) {
        this.responseHandlerService.badGet();
      } else {
        this.responseHandlerService.goodRegister();
        if (info.status === true) {
          this.goLogin();
        }
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status === 0) this.responseHandlerService.badGet();
    },
  };

  loginObserver = {
    next: (info: LoginResponse) => {
      if (info == undefined) {
        this.responseHandlerService.badGet();
      }
      if (info.status == true) {
        sessionStorage.setItem('jwt_token', info.token);
        sessionStorage.setItem('user_role',info.role)
        sessionStorage.setItem('user_id',info.id.toString())
        this.jumpToHome();
      } else {
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('jwt_token');
        sessionStorage.removeItem('user_role');
        this.snackBarService.showSnackBar(info.msg, 3000);
      }
    },
    error: (err: HttpErrorResponse) => {
      if (err.status === 0) {
        this.responseHandlerService.badGet();
      }
    },
  };

  ngOnInit(): void {
    // uses route path to determine whether registering or logging in
    this.route.url.subscribe((url) => {
      let path = url[0].path;
      this.registering = path === 'register';
    });
    this.registerGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', []),
    });
    this.logginGroup = new FormGroup({
      name: new FormControl('', []),
      password: new FormControl('', []),
    });
  }
  confirmPasswordValid() {
    let valid =
      this.registerGroup.get('confirmPassword').value ===
      this.registerGroup.get('password').value;
    return valid;
  }
  getUsernameErrorMessage() {
    if (this.registerGroup.get('name').hasError('required')) {
      return 'Username cannot be empty';
    }
    if (this.registerGroup.get('name').hasError('email')) {
      return 'Valid accolite email address needed';
    }
    return '';
  }
  getPasswordErrorMessage() {
    if (this.registerGroup.get('password').hasError('required')) {
      return 'Password cannot be empty';
    }
    return this.registerGroup.get('password').hasError('minlength')
      ? 'Less than 8 characters'
      : '';
  }
  register() {
    if (!this.registerGroup.get('name').value.match('.@accolitedigital.com')) {
      alert('Please enter an valid accolite email address');
      return;
    }
    let registerRequestBody = {
      user_name: this.registerGroup.get('name').value,
      password: this.registerGroup.get('password').value,
    };
    this.apiService
      .postRegister(registerRequestBody)
      .subscribe(this.registerObserver);
  }
  login() {
    let loginBody = {
      user_name: this.logginGroup.get('name').value,
      password: this.logginGroup.get('password').value,
    };
    this.apiService.postLogin(loginBody).subscribe(this.loginObserver);
  }
  goLogin() {
    this.router.navigateByUrl('/login');
  }
  goRegister() {
    this.router.navigateByUrl('/register');
  }
  jumpToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
