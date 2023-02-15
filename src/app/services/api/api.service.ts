import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAllocatedResourcesURL,
  getCanWritePermissionURL,
  getSkillsURL,
} from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import {
  allProjectsURL,
  approachingProjectsURL,
  clientProjectCountURL,
  clientsURL,
  clientsURLdupe,
  loginURL,
  projectSearchURL,
  projectsURL,
  registrationURL,
  resourceProjectsURL,
  seniorityLevelsURL,
  tasksURL,
  TFRCreationResourceURL,
  TFRLocationCountURL,
  TFRStatusCountURL,
} from '../../shared/constants';
import {
  AllocatedResourceTypeDTO,
  ClientAttributeDTO,
  ClientDTO,
  DisplaySkillDTO,
  LoginResponse,
  Project,
  ProjectDTO,
  ProjectMilestoneDTO,
  RegisterResponse,
  ResourceDTO,
  ResourceListType,
  TaskCreationDTO,
} from '../../shared/interfaces';

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

  postRegister(body: any) {
    return this.http.post<RegisterResponse>(registrationURL, body);
  }

  postLogin(body: any) {
    return this.http.post<LoginResponse>(loginURL, body);
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// GET ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  getTFRLocationCount(): Observable<any> {
    return this.http.get<any>(TFRLocationCountURL);
  }

  getClientProjectCount(): Observable<any> {
    return this.http.get<any>(clientProjectCountURL);
  }

  getApproachingProjectNames(): Observable<any> {
    return this.http.get<any>(approachingProjectsURL);
  }

  getTFRStatusCount(): Observable<any> {
    return this.http.get<any>(TFRStatusCountURL);
  }

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

  getAllClientAttributes(): Observable<ClientAttributeDTO[][]> {
    return this.http.get<ClientAttributeDTO[][]>(
      `${environment.backendURL}/vendorAttributes`
    );
  }

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

  getSkillsByResourceId(resourceId: number): Observable<DisplaySkillDTO[]> {
    return this.http.get<DisplaySkillDTO[]>(getSkillsURL(resourceId));
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

  getCanWritePermission(projectId: number): Observable<boolean> {
    return this.http.get<boolean>(getCanWritePermissionURL(projectId));
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
}
