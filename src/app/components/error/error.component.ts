import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() code!: number;

  message: string = '';
  error: string = '';

  ngOnInit() {
    if (this.code !== undefined) {
      switch (this.code) {
        case 404: {
          this.error = 'Not Found';
          this.message = "The Page you are looking for doesn't exist.";
          break;
        }
        case 503: {
          this.error = 'Service unavailable';
          this.message = 'Sorry. This page is currently unavailable.';
          break;
        }
        case 500: {
          this.error = 'Internal Service Error';
          this.message = 'Sorry. Something went wrong.';
          break;
        }
        case 403: {
          this.error = 'Access Denied';
          this.message = 'You do not have access to view this page.';
          break;
        }
        default: {
          this.error = 'Unknown Error';
          this.message = 'Sorry. Something went wrong.';
        }
      }
    }
  }
}
