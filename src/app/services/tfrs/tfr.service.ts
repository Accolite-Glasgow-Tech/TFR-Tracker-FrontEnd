import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  allProjectsURL,
  projectSearchURL,
  vendorsURLdupe,
} from 'src/app/shared/constants';
import { ProjectDTO } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';
@Injectable({
  providedIn: 'root',
})
export class tfrService {
  constructor(public httpClient: HttpClient, private apiService: ApiService) {}
  getAllProjects(): Observable<ProjectDTO[]> {
    return this.apiService.getAllProjects;
  }

  getAllVendors() {
    return this.apiService.getAllVendors;
  }

  getProjects(body: any): Observable<ProjectDTO[]> {
    return this.httpClient.post<ProjectDTO[]>(projectSearchURL, body);
  }
}
