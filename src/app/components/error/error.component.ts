import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorCodes } from 'src/app/shared/constants';
import { log } from 'src/app/shared/utils';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() error!: HttpErrorResponse;
  description!: string;
  message!: string;
  statusCode!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const parameter = this.route.snapshot.queryParamMap.get('error');
    if (parameter !== null) {
      this.error = <HttpErrorResponse>JSON.parse(parameter);
    }

    log(this.error);
    this.updateInfo();
  }

  updateInfo(): void {
    if (this.error.status === 0) {
      this.statusCode = 503;
      this.description = 'Service Unavailable';
      this.message =
        'The service is temporarily unavailable. Please try again later.';
    } else {
      this.statusCode = this.error.status;
      const desc = HttpErrorCodes.get(this.error.status);
      this.description = desc === undefined ? 'Unknown error!' : desc;
      this.message =
        desc === undefined
          ? 'Sorry, something went wrong.'
          : JSON.stringify(this.error.error).slice(1, -1);
    }
  }
}
