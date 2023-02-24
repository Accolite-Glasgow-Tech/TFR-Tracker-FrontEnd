import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges } from '@angular/core';
import { HttpErrorCodes } from 'src/app/shared/constants';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnChanges {
  @Input() error!: HttpErrorResponse;
  description!: string;
  message!: string;

  ngOnInit() {
    const desc = HttpErrorCodes.get(this.error.status);
    this.description = desc === undefined ? 'Unknown error!' : desc;
    this.message = JSON.stringify(this.error.error);
  }

  ngOnChanges(): void {
    const desc = HttpErrorCodes.get(this.error.status);
    this.description = desc === undefined ? 'Unknown error!' : desc;
    this.message = JSON.stringify(this.error.error).slice(1, -1);
  }
}
