import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from 'src/app/types/types';
import { TfrManagementService } from '../tfr-management/tfr-management.service';

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
  constructor(private tfrManagementService: TfrManagementService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.tfrManagementService.getFromDatabase(
      Number(route.paramMap.get('id'))
    );
  }
}
