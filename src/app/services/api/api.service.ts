import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  getAllocatedResourcesURL,
  getSkillsURL,
  getUpdateProjectResourcesURL,
  getWritePermissionCheckUrl,
} from 'src/app/shared/utils';
import { environment } from 'src/environments/environment';
import {
  allProjectsURL,
  approachingProjectsURL,
  clientProjectCountURL,
  clientsURL,
  clientsURLdupe,
  errorsURL,
  loginURL,
  projectSearchURL,
  projectsURL,
  registrationURL,
  seniorityLevelsURL,
  taskResourcesURL,
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
  ProjectResourceDTO,
  RegisterResponse,
  ResourceDTO,
  ResourceListType,
  TaskCreationDTO,
  TaskResourceDTO,
} from '../../shared/interfaces';
import { SnackBarService } from '../snack-bar/snack-bar.service';

const backendURL = environment.backendURL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// POST //////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  postTask(taskObject: TaskCreationDTO) {
    return this.http.post(tasksURL, taskObject, {
      observe: 'response',
    });
  }

  postProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.post(projectsURL, project);
  }

  postRegister(body: any) {
    return this.http.post<RegisterResponse>(registrationURL, body);
  }

  postLogin(body: any) {
    return this.http.post<LoginResponse>(loginURL, body);
  }

  postError(error: any) {
    return this.http.post(errorsURL, error);
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
      `${backendURL}/search/resource/project/${projectId}`
    );
  }

  getClientAttributes(clientId: number): Observable<ClientAttributeDTO[]> {
    return this.http.get<ClientAttributeDTO[]>(
      `${backendURL}/vendorAttributes/${clientId}`
    );
  }

  getAllClientAttributes(): Observable<ClientAttributeDTO[][]> {
    return this.http.get<ClientAttributeDTO[][]>(
      `${backendURL}/vendorAttributes`
    );
  }

  getProject(projectId: Number): Observable<HttpResponse<Project>> {
    return this.http.get<Project>(`${projectsURL}/${projectId}`, {
      observe: 'response',
    });
  }

  getUserTasks(userId: number) {
    return this.http.get(`${backendURL}/tasks/user/${userId}`);
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

  getHasWritePermission(projectId: number): Observable<boolean> {
    return this.http.get<boolean>(getWritePermissionCheckUrl(projectId));
  }

  getProjectTasks(projectId: number) {
    return this.http.get(`${backendURL}/tasks/project/${projectId}`);
  }

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// PUT ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  putProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.put(projectsURL, project);
  }

  putTaskAvailability(taskResource: TaskResourceDTO) {
    return this.http.put(taskResourcesURL, taskResource, {
      observe: 'response',
    });
  }

  putProjectResources(
    projectId: number,
    projectResourcesWithoutDeleted: ProjectResourceDTO[],
    resourceCount: number
  ) {
    return this.http.put(getUpdateProjectResourcesURL(projectId), {
      resource_count: resourceCount,
      project_resources: projectResourcesWithoutDeleted,
    });
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// DELETE ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  deleteTaskById(taskId: number) {
    return this.http.delete(`${backendURL}/tasks/${taskId}`);
  }

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
}
