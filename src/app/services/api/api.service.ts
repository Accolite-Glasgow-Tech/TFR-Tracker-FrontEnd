import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  allProjectsURL,
  projectSearchURL,
  projectsURL,
  resourceProjectsURL,
  seniorityLevelsURL,
  tasksURL,
  TFRCreationResourceURL,
  clientsURL,
  clientsURLdupe,
} from '../../shared/constants';
import {
  AllocatedResourceTypeDTO,
  Project,
  ProjectDTO,
  ProjectMilestoneDTO,
  ResourceDTO,
  ResourceListType,
  ResourceSkillDTO,
  TaskCreationDTO,
  ClientAttributeDTO,
  ClientDTO,
} from '../../shared/interfaces';

import { getAllocatedResourcesURL, getSkillsURL } from 'src/app/shared/utils';
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

  postProjectResources(project: Project | undefined) {
    return this.http.post(resourceProjectsURL, project);
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// GET ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  getResourcesByProjectId(projectId: number): Observable<ResourceDTO[]> {
    return this.http.get<ResourceDTO[]>(
      `${environment.backendURL}/search/resource/project/${projectId}`
    );
  }

  getClientAttributes(clientId: number): Observable<ClientAttributeDTO[]> {
    return this.http.get<ClientAttributeDTO[]>(
      `${environment.backendURL}/vendorAttributes/${clientId}`
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

  getSkillsByResourceId(resourceId: number): Observable<ResourceSkillDTO[]> {
    return this.http.get<ResourceSkillDTO[]>(getSkillsURL(resourceId));
  }

  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(TFRCreationResourceURL);
  }

  getAllSeniorityLevels(): Observable<string[]> {
    return this.http.get<string[]>(seniorityLevelsURL);
  }

  getResourcesNamesByProjectIdFromDatabase(
    projectId: Number
  ): Observable<AllocatedResourceTypeDTO[]> {
    return this.http.get<AllocatedResourceTypeDTO[]>(
      getAllocatedResourcesURL(projectId)
    );
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

  // Duplicate code (getClients)
  getAllClients() {
    return this.http.get(clientsURLdupe);
  }

  // Duplicate code (getAllClients)
  getClients(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(clientsURL);
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
  clientReset = new EventEmitter<boolean>();

  // This is not an API
  resetClientDetails() {
    this.clientReset.emit(true);
  }
}
