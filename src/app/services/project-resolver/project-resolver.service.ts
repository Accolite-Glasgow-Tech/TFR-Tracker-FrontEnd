import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
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
  implements Resolve<Observable<string | HttpResponse<Project>>>
{
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<string | HttpResponse<Project>> {
    return this.apiService.getProject(Number(route.paramMap.get('id')));
  }
}
