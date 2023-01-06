import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from 'src/app/shared/app.constants';
import {
  Milestone,
  Project,
  ProjectBasicDetails,
  ProjectResource,
  AllocatedResourceType,
  ResourceListType,
} from '../../types/types';
import { ResourceService } from '../resource/resource.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;

  updateProjectToResourceMappingURL =
    APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/projects';
  public projectResourcesWithNames!: AllocatedResourceType[];

  constructor(
    private http: HttpClient,
    private resourceService: ResourceService
  ) {}

  updateBasicDetails() {
    // http POST request '/projects'
    // set projectId with return value of request
    console.log(this.project);
  }

  updateDatabase() {}

  get getProjectId(): number | undefined {
    return this.project?.id;
  }

  get getProjectName(): string | undefined {
    return this.project?.name;
  }

  get getProject(): Project | undefined {
    return this.project;
  }

  setProject(project: Project) {
    this.project = project;
  }

  get getBasicDetails(): ProjectBasicDetails | undefined {
    if (this.project !== undefined) {
      let projectBasicDetails: ProjectBasicDetails = {
        name: this.project.name,
        startDate: this.project.startDate,
        endDate: this.project.endDate,
        vendorId: this.project.vendorId,
        vendorSpecific: this.project.vendorSpecific,
        status: this.project.status,
      };

      return projectBasicDetails;
    }
    return undefined;
  }

  setBasicDetails(projectBasicDetails: ProjectBasicDetails) {
    if (!this.compareBasicDetails(projectBasicDetails)) {
      if (this.project === undefined) {
        this.project = {
          id: NaN,
          name: projectBasicDetails.name,
          vendorId: projectBasicDetails.vendorId,
          startDate: projectBasicDetails.startDate,
          endDate: projectBasicDetails.endDate,
          vendorSpecific: projectBasicDetails.vendorSpecific,
          status: 'DRAFT',
          version: 0,
          milestones: [],
          projectResources: [],
          isDeleted: false,
        };
      } else {
        this.project.name = projectBasicDetails.name;
        this.project.startDate = projectBasicDetails.startDate;
        this.project.endDate = projectBasicDetails.endDate;
        this.project.vendorId = projectBasicDetails.vendorId;
        this.project.vendorSpecific = projectBasicDetails.vendorSpecific;
      }

      this.updateBasicDetails();
    }
  }

  compareBasicDetails(newDetails: ProjectBasicDetails): Boolean {
    var currentDetails = this.getBasicDetails;
    if (currentDetails == undefined) {
      return false;
    }
    if (
      currentDetails.name != newDetails.name ||
      currentDetails.startDate != newDetails.startDate ||
      currentDetails.endDate != newDetails.endDate ||
      currentDetails.status != newDetails.status ||
      currentDetails.vendorId != newDetails.vendorId ||
      currentDetails.vendorSpecific != newDetails.vendorSpecific
    ) {
      return false;
    }
    return true;
  }

  get getMilestones(): Milestone[] | undefined {
    return this.project?.milestones;
  }

  setMilestones(milestones: Milestone[]) {
    if (this.project !== undefined) {
      this.project.milestones = milestones;
      this.updateDatabase();
    }
  }

  get getProjectResources(): ProjectResource[] | undefined {
    return this.project?.projectResources;
  }

  setProjectResources(projectResources: ProjectResource[]) {
    if (this.project !== undefined) {
      this.project.projectResources = projectResources;
    }
  }

  convertToProjectResourcesWithNames(resourcesDetails: ResourceListType[]) {
    this.projectResourcesWithNames = [];
    resourcesDetails.forEach((resourceDetails) => {
      let projectResource: ProjectResource =
        this.project?.projectResources.find(
          (resource) => resource.resource_id === resourceDetails.resource_id
        )!;
      let allocatedResource: AllocatedResourceType = {
        project_id: projectResource.project_id,
        resource_id: resourceDetails.resource_id,
        resource_name: resourceDetails.resource_name,
        resource_email: resourceDetails.resource_email,
        role: projectResource.role,
      };
      this.projectResourcesWithNames.push(allocatedResource);
    });
  }

  get getProjectResourcesWithNames(): AllocatedResourceType[] {
    return this.projectResourcesWithNames;
  }

  setProjectResourcesWithNames(
    projectResourcesWithNames: AllocatedResourceType[]
  ) {
    const newArray = projectResourcesWithNames.map(
      ({ resource_name, resource_email, ...keepAttrs }) => {
        keepAttrs.role = this.resourceService.getAssociatedEnumRole(
          keepAttrs.role
        );
        return keepAttrs;
      }
    );
    this.projectResourcesWithNames = projectResourcesWithNames;
    this.setProjectResources(newArray);
  }

  updateProjectToResourceMapping() {
    this.http
      .put(
        this.updateProjectToResourceMappingURL + '/' + this.getProjectId,
        this.getProjectResources
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getProjectFromDatabaseByProjectId(project_id: Number) {
    console.log(
      'fetched project with project id ' + project_id + ' from database'
    );

    this.project = {
      id: 1,
      name: 'Bank Project',
      vendorId: 1,
      startDate: new Date('December 25, 2021 00:00:00'),
      endDate: new Date('December 31, 2022 00:00:00'),
      vendorSpecific:
        '{"Department":"Finance", "Cost Center":"Private Banking", "City":"Glasgow", "Manager":"Jake Lam"}',
      status: 'DRAFT',
      version: 1,
      milestones: [
        {
          id: 1,
          projectId: 2,
          description: 'deployment',
          startDate: new Date('2022-12-12 09:00:00'),
          deliveryDate: new Date('2022-12-16 23:59:59'),
          acceptanceDate: new Date('2022-12-31 23:59:59'),
          isDeleted: false,
        },
      ],
      projectResources: [
        {
          project_id: 1,
          resource_id: 1,
          role: 'SCRUM_MASTER',
        },
        {
          project_id: 1,
          resource_id: 2,
          role: 'SOFTWARE_DEVELOPER',
        },
      ],
      isDeleted: false,
    };
  }

  getResourcesNamesByProjectIdFromDatabase(project_id: Number) {
    this.http
      .get<ResourceListType[]>(
        APPCONSTANTS.APICONSTANTS.BASE_URL +
          '/resources/projects/' +
          project_id +
          '/names'
      )
      .subscribe((data: ResourceListType[]) => {
        this.convertToProjectResourcesWithNames(data);
      });
  }
}
