import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class WriteGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkIfComponentCanBeActivated(route.paramMap.get('id'));
  }

  checkIfComponentCanBeActivated(projectId: string | null) {
    const id: number = parseInt(projectId as string);
    return this.apiService.getHasWritePermission(id).pipe(
      map((res) => {
        if (res === true) {
          return true;
        } else {
          this.router.navigateByUrl('/tfr/' + projectId);
          return false;
        }
      })
    );
  }
}
