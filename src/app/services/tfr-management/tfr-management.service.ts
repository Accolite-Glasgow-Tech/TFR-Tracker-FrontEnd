import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseURL } from 'src/app/constants/contants';
import {
  Milestone,
  Project,
  ProjectBasicDetails,
  ProjectResource,
  AllocatedResourceType,
} from 'src/app/types/types';
import { ResourceService } from '../resource/resource.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;
  public projectResourcesWithNames!: AllocatedResourceType[];

  updateProjectToResourceMappingURL = baseURL + '/resources/projects';

  constructor(
    private http: HttpClient,
    private resourceService: ResourceService
  ) {}

  updateDatabase() {
    console.log(this.project);
  }

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
      let projectBasicDetails!: ProjectBasicDetails;
      projectBasicDetails.name = this.project.name;
      projectBasicDetails.startDate = this.project.startDate;
      projectBasicDetails.endDate = this.project.endDate;
      projectBasicDetails.vendorId = this.project.vendorId;
      projectBasicDetails.vendorSpecific = this.project.vendorSpecific;
      return projectBasicDetails;
    }
    return undefined;
  }

  setBasicDetails(projectBasicDetails: ProjectBasicDetails) {
    if (this.project === undefined) {
      this.project = {
        id: -1,
        name: projectBasicDetails.name,
        vendorId: projectBasicDetails.vendorId,
        startDate: projectBasicDetails.startDate,
        endDate: projectBasicDetails.endDate,
        vendorSpecific: projectBasicDetails.vendorSpecific,
        status: '',
        version: '',
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

    this.updateDatabase();
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
