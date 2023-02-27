import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, of, Subject, tap } from 'rxjs';
import {
  AllocatedResourceTypeDTO,
  ClientDTO,
  MilestoneDTO,
  Project,
  ProjectBasicDetails,
  ProjectMilestoneDTO,
  ProjectResourceDTO,
} from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';
import { ResourceService } from '../resource/resource.service';
import { ResponseHandlerService } from '../response-handler/response-handler.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;
  projectResourcesWithNames!: AllocatedResourceTypeDTO[];
  subject = new Subject<boolean>();
  clientReset = new EventEmitter<boolean>();
  canEdit: boolean = false;

  clientName: string = '';

  updateProjectToDatabaseObserver = {
    next: (response: Data) => {
      this.updateVersion(response);
      this.responseHandlerService.goodSave();
      this.subject.next(true);
    },
    error: (err: HttpErrorResponse) => {
      this.responseHandlerService.handleBadProjectUpdate(err);
      this.subject.next(false);
    },
  };

  createProjectObserver = {
    next: (response: any) => {
      if (this.project) {
        this.project.id = Number(response);
        this.responseHandlerService.goodSave();
        this.getFromDatabase(Number(response)).subscribe((res) => {
          this.extractProject(res);
        });
        this.subject.next(true);
      }
    },
    error: (err: HttpErrorResponse) => {
      this.responseHandlerService.handleBadProjectUpdate(err);
      this.subject.next(false);
    },
  };

  protected getResourceNameObserver = {
    next: (data: AllocatedResourceTypeDTO[]) => {
      this.projectResourcesWithNames = data;
    },
  };

  protected getCanWritePermissionObserver = {
    next: (data: boolean) => {
      this.canEdit = data;
    },
  };

  protected retrieveProjectObserver = {
    next: (response: Data) => {
      let status = response['project']['status'];

      let project = response['project'];
      this.project = project;
      this.apiService
        .getResourcesNamesByProjectIdFromDatabase(this.project?.id!)
        .subscribe(this.getResourceNameObserver);
      this.setClientName(this.project?.client_id!);
      this.apiService
        .getHasWritePermission(this.project?.id!)
        .subscribe(this.getCanWritePermissionObserver);
    },
  };

  constructor(
    private apiService: ApiService,
    private responseHandlerService: ResponseHandlerService,
    private resourceService: ResourceService
  ) {}

  get getProjectObserver() {
    return this.retrieveProjectObserver;
  }

  get getProjectId(): number | undefined {
    return this.project?.id;
  }

  get getProjectName(): string | undefined {
    return this.project?.name;
  }

  get getMilestones(): MilestoneDTO[] | undefined {
    return this.project?.milestones;
  }

  get getProjectResourcesWithNames(): AllocatedResourceTypeDTO[] {
    return this.projectResourcesWithNames;
  }

  get getProjectResources(): ProjectResourceDTO[] | undefined {
    return this.project?.project_resources;
  }

  get getProject(): Project | undefined {
    return this.project;
  }

  get getClientName(): string {
    return this.clientName;
  }

  get getResourcesCount(): number | undefined {
    return this.project?.resources_count;
  }

  setProject(project: Project) {
    this.project = project;
  }

  get getBasicDetails(): ProjectBasicDetails | undefined {
    if (this.project !== undefined) {
      let projectBasicDetails: ProjectBasicDetails = {
        name: this.project.name,
        start_date: this.project.start_date,
        end_date: this.project.end_date,
        client_id: this.project.client_id,
        client_specific: this.project.client_specific,
        status: this.project.status,
      };

      return projectBasicDetails;
    }
    return undefined;
  }

  setBasicDetails(
    projectBasicDetails: ProjectBasicDetails,
    previousUpdateSuccessful: boolean
  ): Observable<boolean> {
    if (
      !(
        previousUpdateSuccessful &&
        this.compareBasicDetails(projectBasicDetails)
      )
    ) {
      this.setClientName(projectBasicDetails.client_id);
      if (this.project === undefined) {
        this.project = {
          id: NaN,
          name: projectBasicDetails.name,
          client_id: projectBasicDetails.client_id,
          start_date: projectBasicDetails.start_date,
          end_date: projectBasicDetails.end_date,
          client_specific: projectBasicDetails.client_specific,
          resources_count: 0,
          status: projectBasicDetails.status,
          version: 0,
          milestones: [],
          project_resources: [],
          is_deleted: false,
          created_by: NaN,
          modified_by: NaN,
          created_at: new Date('2022-12-05T10:00:00.000+00:00'),
          modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
          notes: '',
        };
        return this.createProjectInDatabase();
      } else {
        this.project.name = projectBasicDetails.name;
        this.project.start_date = projectBasicDetails.start_date;
        this.project.end_date = projectBasicDetails.end_date;
        this.project.client_id = projectBasicDetails.client_id;
        this.project.client_specific = projectBasicDetails.client_specific;
        this.project.status = projectBasicDetails.status;
        return this.updateProjectToDatabase();
      }
    }
    return of(true);
  }

  createProjectInDatabase(): Observable<boolean> {
    this.apiService
      .postProject(this.project)
      .subscribe(this.createProjectObserver);
    return this.subject.asObservable();
  }

  updateProjectToDatabase(): Observable<boolean> {
    this.apiService
      .putProject(this.project)
      .subscribe(this.updateProjectToDatabaseObserver);
    return this.subject.asObservable();
  }

  setClientName(client_id: number) {
    this.apiService.getClients().subscribe((result: ClientDTO[]) => {
      this.clientName = result.find(
        (client: ClientDTO) => client.id === client_id
      )!.name;
    });
  }

  compareBasicDetails(newDetails: ProjectBasicDetails): Boolean {
    var currentDetails = this.getBasicDetails;
    if (currentDetails === undefined) {
      return false;
    }
    if (
      currentDetails.name != newDetails.name ||
      currentDetails.start_date != newDetails.start_date ||
      currentDetails.end_date != newDetails.end_date ||
      currentDetails.status != newDetails.status ||
      currentDetails.client_id != newDetails.client_id ||
      currentDetails.client_specific != newDetails.client_specific
    ) {
      return false;
    }
    return true;
  }

  set milestones(milestones: MilestoneDTO[]) {
    if (this.project !== undefined) {
      this.project.milestones = milestones;
    }
  }

  stripTempIds(milestones: MilestoneDTO[]): MilestoneDTO[] {
    let strippedMilestones: MilestoneDTO[] = milestones.map((milestone) => {
      if (milestone.id! > 0) {
        return milestone;
      }
      let { id, ...cleanedMilestone } = milestone;
      return cleanedMilestone;
    });
    return strippedMilestones;
  }

  updateVersion(response: {}) {
    if (this.project) {
      this.project.version = Number(response);
    }
  }

  projectStripTempIds(milestonesToStrip: MilestoneDTO[]): ProjectMilestoneDTO {
    if (this.project) {
      let projectDTO: ProjectMilestoneDTO = this.project;
      projectDTO.milestones = this.stripTempIds(milestonesToStrip);
      return projectDTO;
    }
    throw new Error('No project defined');
  }

  putMilestones(milestones: MilestoneDTO[]): Observable<{}> {
    return this.project == undefined
      ? new Observable<{}>((subscriber) => {
          subscriber.error('project undefined');
          subscriber.complete;
        })
      : this.apiService
          .putProject(this.projectStripTempIds(milestones))
          .pipe(tap({ next: this.updateVersion }));
  }

  setProjectResources(project_resources: ProjectResourceDTO[]) {
    if (this.project !== undefined) {
      this.project.project_resources = project_resources;
    }
  }

  setResourcesCount(resources_count: number) {
    if (this.project) {
      this.project.resources_count = resources_count;
    }
  }

  setProjectResourcesWithNames(
    projectResourcesWithNames: AllocatedResourceTypeDTO[]
  ) {
    const newArray: ProjectResourceDTO[] = projectResourcesWithNames.map(
      ({ resource_name, resource_email, ...keepAttrs }) => {
        return {
          resource_id: keepAttrs.resource_id,
          project_id: keepAttrs.project_id,
          role: keepAttrs.role,
          seniority: keepAttrs.seniority,
          is_deleted: keepAttrs.is_deleted,
        };
      }
    );
    this.projectResourcesWithNames = [...projectResourcesWithNames];
    this.setProjectResources(newArray);
  }

  updateProjectToResourceMapping(): Observable<boolean> {
    this.apiService
      .putProjectResources(
        this.project?.id!,
        this.resourceService.projectResourcesWithoutDeleted(
          this.project?.project_resources!
        ),
        this.getResourcesCount!
      )
      .subscribe(this.updateProjectToDatabaseObserver);
    return this.subject.asObservable();
  }

  getFromDatabase(project_id: number): Observable<HttpResponse<Project>> {
    return this.apiService.getProject(project_id);
  }

  extractProject(value: HttpResponse<Project>) {
    this.project = value.body ?? undefined;
    return value;
  }

  updateStatusToDatabase(): Observable<boolean> {
    return this.apiService.putStatus(this.project!.id, 'AGREED');
  }

  setNotes(notes: string) {
    if (this.project) {
      this.project.notes = notes;
      this.updateProjectToDatabase();
    }
  }

  resetClientDetails() {
    this.clientReset.emit(true);
  }
}
