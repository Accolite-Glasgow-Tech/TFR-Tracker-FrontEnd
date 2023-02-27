import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorCodes } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  error!: HttpErrorResponse;
  description!: string;
  message!: string;
  debugInfo: string | undefined;
  env = environment;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const parameter = this.route.snapshot.queryParamMap.get('error');
    if (parameter !== null) {
      this.error = <HttpErrorResponse>JSON.parse(parameter);
    }
    this.updateInfo();
    if (!environment.production) {
      this.debugInfo = JSON.stringify({
        headers: this.error.headers,
        statusText: this.error.statusText,
        url: this.error.url,
      });
    }
  }

  updateInfo(): void {
    const desc = HttpErrorCodes.get(this.error.status);
    this.description = desc === undefined ? 'Unknown error!' : desc;
    this.message = JSON.stringify(this.error.error).slice(1, -1);
  }
}
