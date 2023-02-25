import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (error) => {
          switch (error.status) {
            case 0:
              this.redirecToError(
                new HttpErrorResponse({
                  error:
                    'Service is temporarily unavailable. Please try again later.',
                  headers: error.headers,
                  status: 503,
                  statusText: error.statusText,
                  url: error.url,
                })
              );
              break;
            case 401:
              this.redirectToLogin();
              break;
            default:
              this.redirecToError(error);
              break;
          }
        },
      })
    );
  }

  redirectToLogin(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    this.snackBarService.showSnackBar(
      'Your token has expired; please log in again',
      5000
    );
  }

  redirecToError(error: HttpErrorResponse) {
    this.router.navigate(['/error'], {
      skipLocationChange: true,
      queryParams: { error: JSON.stringify(error) },
    });
  }
}
