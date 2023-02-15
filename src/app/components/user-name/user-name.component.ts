import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss'],
})
export class UserNameComponent {
  userName: string | null = null;
  constructor(private router: Router) {
    router.events.subscribe(
      () => (this.userName = sessionStorage.getItem('user_name'))
    );
  }
}
