import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectsURL, tasksURL, vendorsURL } from '../../shared/constants';
import {
  Project,
  ProjectMilestoneDTO,
  TaskCreationDTO,
  VendorAttributeDTO,
  VendorDTO,
} from '../../shared/interfaces';
import {
  getProjectURL,
  getResourcesByProjectIdURL,
  getUpdateProjectStatusURL,
  getVendorAttributesURL,
} from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  vendorReset = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

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
}
