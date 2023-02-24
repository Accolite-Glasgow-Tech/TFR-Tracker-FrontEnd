import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { HttpErrorCodes } from 'src/app/shared/constants';
import { log } from 'src/app/shared/utils';

@Component({
  selector: 'app-error-generator',
  templateUrl: './error-generator.component.html',
  styleUrls: ['./error-generator.component.scss'],
})
export class ErrorGeneratorComponent {
  constructor(private apiService: ApiService) {}

  error: HttpErrorResponse = new HttpErrorResponse({ error: '', status: 0 });

  form = new FormGroup({
    status: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  errorCodes = [...HttpErrorCodes.keys()].sort();

  onSubmit() {
    const dto = {
      status: this.form.get('status')!.value,
      message: this.form.get('message')!.value,
    };
    this.apiService.postError(dto).subscribe({
      error: (error: HttpErrorResponse) => {
        this.error = error;
        log(error);
      },
    });
  }
}
