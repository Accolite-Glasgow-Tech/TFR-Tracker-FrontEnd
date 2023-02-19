import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Resolve } from '@angular/router';
import { catchError, mergeMap, Observable, of } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';

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
        return of(response['body']);
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 0) {
          return of(new HttpErrorResponse({ status: 503 }));
        } else {
          return of(new HttpErrorResponse({ status: err.status }));
        }
      })
    );
  }
}
