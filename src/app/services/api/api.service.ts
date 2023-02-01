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
  TaskCreationDTO,
  VendorAttributeDTO,
  VendorDTO,
} from '../../shared/interfaces';
import {
  getProjectURL,
  getResourcesByProjectIdURL,
  getUpdateProjectStatusURL,
  getUserTasksURL,
  getVendorAttributesURL,
} from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  vendorReset!: EventEmitter<boolean>;

  constructor(private http: HttpClient) {
    this.vendorReset = new EventEmitter<boolean>();
  }

  resetVendorDetails() {
    this.vendorReset.emit(true);
  }

  get getVendors(): Observable<VendorDTO[]> {
    return this.http.get<VendorDTO[]>(vendorsURL);
  }

  getResourcesByProjectId(tfrId: number) {
    return this.http.get(getResourcesByProjectIdURL(tfrId));
  }

  postTask(taskObject: TaskCreationDTO) {
    return this.http.post(tasksURL, taskObject);
  }

  getVendorAttributes(vendor_id: number): Observable<VendorAttributeDTO[]> {
    return this.http.get<VendorAttributeDTO[]>(
      getVendorAttributesURL(vendor_id)
    );
  }

  getProject(project_id: Number): Observable<HttpResponse<Project>> {
    return this.http.get<Project>(getProjectURL(project_id), {
      observe: 'response',
    });
  }

  putStatusAgreed(projectId: number): Observable<boolean> {
    return this.http.put<boolean>(
      getUpdateProjectStatusURL(projectId, 'AGREED'),
      null
    );
  }

  postProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.post(projectsURL, project);
  }

  putProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.put(projectsURL, project);
  }

  getUserTasksById(userId: number | undefined): Observable<{}> {
    return userId
      ? this.http.get(getUserTasksURL(userId))
      : new Observable((subscriber) => {
          subscriber.error('user Id undefined');
          subscriber.complete;
        });
  }

  get getAllProjects(): Observable<ProjectDTO[]> {
    return this.http.get<ProjectDTO[]>(allProjectsURL);
  }

  get getAllVendors() {
    return this.http.get(vendorsURLdupe);
  }

  searchProjects(body: any): Observable<ProjectDTO[]> {
    return this.http.post<ProjectDTO[]>(projectSearchURL, body);
  }
}
