import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WidgetApproachingProjectsService {
  private ApproachingProjectsUrl =
    'http://localhost:8080/ProjectsStartingInAWeek';

  constructor(private http: HttpClient) {}

  readApproachingProjectNamesData(): Observable<any> {
    return this.http.get(this.ApproachingProjectsUrl);
  }
}
