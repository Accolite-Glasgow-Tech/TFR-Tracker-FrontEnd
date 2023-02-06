import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, mergeMap, Observable, of, throwError } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})

/*
  Resolver Service that pre-fetches the current project before loading
  the component that requires this project body.
*/
export class ProjectResolverService
  implements Resolve<Observable<Project | HttpErrorResponse>>
{
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Project | HttpErrorResponse> {
    return this.apiService.getProject(Number(route.paramMap.get('id'))).pipe(
      mergeMap((response: Data) => {
        let project: Project = response['body'];
        return of(project);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          return of(new HttpErrorResponse({ status: 503 }));
        } else {
          return of(new HttpErrorResponse({ status: 500 }));
        }
      })
    );
  }
}
