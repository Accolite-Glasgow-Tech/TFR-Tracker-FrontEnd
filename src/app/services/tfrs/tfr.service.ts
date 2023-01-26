import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  allProjectsURL,
  projectSearchURL,
  vendorsURLdupe,
} from 'src/app/shared/constants';
import { ProjectDTO } from 'src/app/shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class tfrService {
  constructor(public httpClient: HttpClient) {}
  getAllProjects(): Observable<ProjectDTO[]> {
    return this.httpClient.get<ProjectDTO[]>(allProjectsURL);
  }

  getAllVendors() {
    return this.httpClient.get(vendorsURLdupe);
  }

  getProjects(body: any): Observable<ProjectDTO[]> {
    return this.httpClient.post<ProjectDTO[]>(projectSearchURL, body);
  }
}
