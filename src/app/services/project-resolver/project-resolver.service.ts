import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, mergeMap, Observable, of } from 'rxjs';
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
  implements Resolve<Observable<Project | HttpErrorResponse | never>>
{
  constructor(private apiService: ApiService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Project | HttpErrorResponse | never> {
    return this.apiService.getProject(Number(route.paramMap.get('id'))).pipe(
      mergeMap((response: Data) => {
        if (Object.keys(response).length !== 0) {
          let status: number = response['status'];
          let project: Project = response['body'];
          if (status === 200) {
            return of(project);
          } else {
            return of(new HttpErrorResponse({ status: 500 }));
          }
        } else {
          this.router.navigate(['/tfrs']);
          return EMPTY;
        }
      }),
      catchError(() => {
        this.router.navigate(['/tfrs']);
        return EMPTY;
      })
    );
  }
}
