import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { userService } from 'src/app/service/user/user.service';

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

  constructor(private userService: userService,private router:Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    // uses route path to determine whether registering or logging in
    this.route.url.subscribe(url => {
      let path = url[0].path;
      this.registering = path === 'register';
    });

    this.registerGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
    return this.registerGroup.get('name').hasError('minlength')
      ? 'Less than 5 characters'
      : '';
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
    let registerRequestBody = {
      user_name: this.registerGroup.get('name').value,
      password: this.registerGroup.get('password').value,
    };
    this.userService.register(registerRequestBody).subscribe((info) => {
      if (info === undefined) {
        alert('Failure, please try again');
      } else {
        alert(info.msg);
        if (info.status == true) {
          this.goLogin();
        }
      }
    });
  }

  login() {
    let loginBody = {
      user_name: this.logginGroup.get('name').value,
      password: this.logginGroup.get('password').value,
    };
    this.userService.login(loginBody).subscribe((info) => {
      if (info == undefined) {
        alert('Failure, please try again');
      }
      if (info.status == true) {
        sessionStorage.setItem('jwt_token', info.token);
        this.jumpToHome();
      } else {
        sessionStorage.removeItem('jwt_token');
        alert(info.msg);
      }
    });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  jumpToHome():void{
    this.router.navigateByUrl('/home');
  }
}
