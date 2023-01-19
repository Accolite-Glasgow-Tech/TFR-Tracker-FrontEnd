import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { approachingProjectsURL } from 'src/app/shared/constants';
@Injectable({
  providedIn: 'root',
})
export class WidgetApproachingProjectsService {
  constructor(private http: HttpClient) {}

  readApproachingProjectNamesData(): Observable<any> {
    return this.http.get(approachingProjectsURL);
  }
}
