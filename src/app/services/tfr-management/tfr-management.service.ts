import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/app/constants/contants';
import {
  Milestone,
  Project,
  ProjectBasicDetails,
  ProjectResource,
  AllocatedResourceType,
} from '../../types/types';
import { ResourceService } from '../resource/resource.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;

  updateProjectToResourceMappingURL = baseURL + '/resources/projects';
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
}
