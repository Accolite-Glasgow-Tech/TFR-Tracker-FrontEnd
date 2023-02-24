import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
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
            case 401:
              this.cleanAndRedirect();
              break;
            default:
              break;
          }
        },
      })
    );
  }

  cleanAndRedirect(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    this.snackBarService.showSnackBar(
      'Your token has expired; please log in again',
      5000
    );
  }
}
