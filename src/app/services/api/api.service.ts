import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  allProjectsURL,
  projectSearchURL,
  projectsURL,
  tasksURL,
  vendorsURL,
  vendorsURLdupe,
} from '../../shared/constants';
import {
  Project,
  ProjectDTO,
  ProjectMilestoneDTO,
  ResourceDTO,
  TaskCreationDTO,
  VendorAttributeDTO,
  VendorDTO,
} from '../../shared/interfaces';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// POST //////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  postTask(taskObject: TaskCreationDTO) {
    return this.http.post(tasksURL, taskObject);
  }

  postProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.post(projectsURL, project);
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// GET ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  getResourcesByProjectId(projectId: number): Observable<ResourceDTO[]> {
    return this.http.get<ResourceDTO[]>(
      `${environment.backendURL}/search/resource/project/${projectId}`
    );
  }

  getVendorAttributes(vendorId: number): Observable<VendorAttributeDTO[]> {
    return this.http.get<VendorAttributeDTO[]>(
      `${environment.backendURL}/vendorAttributes/${vendorId}`
    );
  }

  // Is there a reason that we need to read the httpResponse rather than the project itself?
  getProject(projectId: Number): Observable<HttpResponse<Project>> {
    return this.http.get<Project>(`${projectsURL}/${projectId}`, {
      observe: 'response',
    });
  }

  getUserTasksById(userId: number): Observable<{}> {
    return this.http.get(`${environment.backendURL}/tasks/${userId}`);
  }

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(allProjectsURL);
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// PUT ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  putProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.put(projectsURL, project);
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// DELETE ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// REFACTOR //////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Duplicate code (getVendors)
  getAllVendors() {
    return this.http.get(vendorsURLdupe);
  }

  // Duplicate code (getAllVendors)
  getVendors(): Observable<VendorDTO[]> {
    return this.http.get<VendorDTO[]>(vendorsURL);
  }

  // Rename to something like PostProjectSearch
  searchProjects(body: any): Observable<ProjectDTO[]> {
    return this.http.post<ProjectDTO[]>(projectSearchURL, body);
  }

  // Bad use of put request, instead of using the URL to update the status and passing null as data, use the data to update the status
  putStatus(projectId: number, status: string): Observable<boolean> {
    return this.http.put<boolean>(
      `${projectsURL}/${projectId}/status/${status}`,
      null
    );
  }

  // This is not an API
  vendorReset = new EventEmitter<boolean>();

  // This is not an API
  resetVendorDetails() {
    this.vendorReset.emit(true);
  }
}
