import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import {
  getAllocatedResourcesURL,
  getSkillsURL,
  getWritePermissionCheckUrl,
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
import { SnackBarService } from '../snack-bar/snack-bar.service';

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
  redirectTap = {
    error: (error: HttpErrorResponse) => {
      error.status == 401 ? this.cleanAndRedirect() : true;
    },
  };

  cleanAndRedirect(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
    this.snackBarService.showSnackBar(
      'login expired, please log in again',
      5000
    );
  }

  postTask(taskObject: TaskCreationDTO) {
    const result = this.http.post(tasksURL, taskObject, {
      observe: 'response',
    });
    return result;
  }

  postProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.post(projectsURL, project).pipe(tap(this.redirectTap));
  }

  postProjectResources(project: Project | undefined) {
    return this.http
      .post(resourceProjectsURL, project)
      .pipe(tap(this.redirectTap));
  }

  postRegister(body: any) {
    return this.http
      .post<RegisterResponse>(registrationURL, body)
      .pipe(tap(this.redirectTap));
  }

  postLogin(body: any) {
    return this.http
      .post<LoginResponse>(loginURL, body)
      .pipe(tap(this.redirectTap));
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// GET ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  getTFRLocationCount(): Observable<any> {
    return this.http.get<any>(TFRLocationCountURL).pipe(tap(this.redirectTap));
  }

  getClientProjectCount(): Observable<any> {
    return this.http
      .get<any>(clientProjectCountURL)
      .pipe(tap(this.redirectTap));
  }

  getApproachingProjectNames(): Observable<any> {
    return this.http
      .get<any>(approachingProjectsURL)
      .pipe(tap(this.redirectTap));
  }

  getTFRStatusCount(): Observable<any> {
    return this.http.get<any>(TFRStatusCountURL).pipe(tap(this.redirectTap));
  }

  getResourcesByProjectId(projectId: number): Observable<ResourceDTO[]> {
    return this.http
      .get<ResourceDTO[]>(
        `${environment.backendURL}/search/resource/project/${projectId}`
      )
      .pipe(tap(this.redirectTap));
  }

  getClientAttributes(clientId: number): Observable<ClientAttributeDTO[]> {
    return this.http
      .get<ClientAttributeDTO[]>(
        `${environment.backendURL}/vendorAttributes/${clientId}`
      )
      .pipe(tap(this.redirectTap));
  }

  getAllClientAttributes(): Observable<ClientAttributeDTO[][]> {
    return this.http
      .get<ClientAttributeDTO[][]>(`${environment.backendURL}/vendorAttributes`)
      .pipe(tap(this.redirectTap));
  }

  getProject(projectId: Number): Observable<HttpResponse<Project>> {
    return this.http
      .get<Project>(`${projectsURL}/${projectId}`, {
        observe: 'response',
      })
      .pipe(tap(this.redirectTap));
  }

  getUserTasksById(userId: number): Observable<{}> {
    return this.http
      .get(`${environment.backendURL}/tasks/${userId}`)
      .pipe(tap(this.redirectTap));
  }

  getAllProjects(): Observable<ProjectDTO[]> {
    return this.http
      .get<ProjectDTO[]>(allProjectsURL)
      .pipe(tap(this.redirectTap));
  }

  getSkillsByResourceId(resourceId: number): Observable<DisplaySkillDTO[]> {
    return this.http
      .get<DisplaySkillDTO[]>(getSkillsURL(resourceId))
      .pipe(tap(this.redirectTap));
  }

  getAllResources(): Observable<ResourceListType[]> {
    return this.http
      .get<ResourceListType[]>(TFRCreationResourceURL)
      .pipe(tap(this.redirectTap));
  }

  getAllSeniorityLevels(): Observable<string[]> {
    return this.http
      .get<string[]>(seniorityLevelsURL)
      .pipe(tap(this.redirectTap));
  }

  getResourcesNamesByProjectIdFromDatabase(
    projectId: Number
  ): Observable<AllocatedResourceTypeDTO[]> {
    return this.http
      .get<AllocatedResourceTypeDTO[]>(getAllocatedResourcesURL(projectId))
      .pipe(tap(this.redirectTap));
  }

  getHasWritePermission(projectId: number): Observable<boolean> {
    return this.http
      .get<boolean>(getWritePermissionCheckUrl(projectId))
      .pipe(tap(this.redirectTap));
  }

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// PUT ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  putProject(project: Project | undefined | ProjectMilestoneDTO) {
    return this.http.put(projectsURL, project).pipe(tap(this.redirectTap));
  }
  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// DELETE ////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////// REFACTOR //////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Duplicate code (getClients)
  getAllClients() {
    return this.http.get(clientsURLdupe).pipe(tap(this.redirectTap));
  }

  // Duplicate code (getAllClients)
  getClients(): Observable<ClientDTO[]> {
    return this.http.get<ClientDTO[]>(clientsURL).pipe(tap(this.redirectTap));
  }

  // Rename to something like PostProjectSearch
  searchProjects(body: any): Observable<ProjectDTO[]> {
    return this.http
      .post<ProjectDTO[]>(projectSearchURL, body)
      .pipe(tap(this.redirectTap));
  }

  // Bad use of put request, instead of using the URL to update the status and passing null as data, use the data to update the status
  putStatus(projectId: number, status: string): Observable<boolean> {
    return this.http
      .put<boolean>(`${projectsURL}/${projectId}/status/${status}`, null)
      .pipe(tap(this.redirectTap));
  }
}
