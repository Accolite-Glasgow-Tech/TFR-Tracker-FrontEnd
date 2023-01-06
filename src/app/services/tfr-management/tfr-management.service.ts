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
    // set project_id with return value of request
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
        start_date: this.project.start_date,
        end_date: this.project.end_date,
        vendor_id: this.project.vendor_id,
        vendor_specific: this.project.vendor_specific,
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
          vendor_id: projectBasicDetails.vendor_id,
          start_date: projectBasicDetails.start_date,
          end_date: projectBasicDetails.end_date,
          vendor_specific: projectBasicDetails.vendor_specific,
          status: 'DRAFT',
          version: 0,
          milestones: [],
          project_resources: [],
          is_deleted: false,
          created_by: NaN,
          modified_by: NaN,
          created_at: new Date('2022-12-05T10:00:00.000+00:00'),
          modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
        };
      } else {
        this.project.name = projectBasicDetails.name;
        this.project.start_date = projectBasicDetails.start_date;
        this.project.end_date = projectBasicDetails.end_date;
        this.project.vendor_id = projectBasicDetails.vendor_id;
        this.project.vendor_specific = projectBasicDetails.vendor_specific;
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
      currentDetails.start_date != newDetails.start_date ||
      currentDetails.end_date != newDetails.end_date ||
      currentDetails.status != newDetails.status ||
      currentDetails.vendor_id != newDetails.vendor_id ||
      currentDetails.vendor_specific != newDetails.vendor_specific
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
    return this.project?.project_resources;
  }

  setProjectResources(project_resources: ProjectResource[]) {
    if (this.project !== undefined) {
      this.project.project_resources = project_resources;
    }
  }

  convertToProjectResourcesWithNames(resourcesDetails: ResourceListType[]) {
    this.projectResourcesWithNames = [];
    resourcesDetails.forEach((resourceDetails) => {
      let projectResource: ProjectResource =
        this.project?.project_resources.find(
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
    this.http
      .get<Project>(
        APPCONSTANTS.APICONSTANTS.BASE_URL + '/projects/' + project_id
      )
      .subscribe((data: Project) => {
        this.project = data;
        this.project.vendor_specific = this.project?.vendor_specific
          .replace(/\\/g, '')
          .replace('"', '')
          .replace(/"([^"]*)$/, '$1');
        this.project.project_resources.forEach(
          (project_resource: ProjectResource) => {
            project_resource.role = project_resource.role.replace(/_/g, ' ');
          }
        );
        this.getResourcesNamesByProjectIdFromDatabase(this.project.id);
        console.log('Here');
      });

    // this.project = {
    //   id: 1,
    //   name: 'Bank Project',
    //   vendor_id: 1,
    //   start_date: new Date('December 25, 2021 00:00:00'),
    //   end_date: new Date('December 31, 2022 00:00:00'),
    //   vendor_specific:
    //     '{"Department":"Finance", "Cost Center":"Private Banking", "City":"Glasgow", "Manager":"Jake Lam"}',
    //   status: 'DRAFT',
    //   version: 1,
    //   milestones: [
    //     {
    //       id: 1,
    //       project_id: 2,
    //       description: 'deployment',
    //       start_date: new Date('2022-12-12 09:00:00'),
    //       delivery_date: new Date('2022-12-16 23:59:59'),
    //       acceptance_date: new Date('2022-12-31 23:59:59'),
    //       is_deleted: false,
    //       tracker: {
    //         milestone_id: 1,
    //         project_id: 1,
    //         start_date: new Date('2022-12-12T09:00:00.000+00:00'),
    //         end_date: new Date('2022-12-16T23:59:59.000+00:00'),
    //         status: 'PROGRESS',
    //         created_by: 1,
    //         modified_by: 2,
    //         created_at: new Date('2022-12-01T09:00:00.000+00:00'),
    //         modified_at: new Date('2022-12-01T10:00:00.000+00:00'),
    //       },
    //     },
    //   ],
    //   project_resources: [
    //     {
    //       project_id: 1,
    //       resource_id: 1,
    //       role: 'SCRUM_MASTER',
    //     },
    //     {
    //       project_id: 1,
    //       resource_id: 2,
    //       role: 'SOFTWARE_DEVELOPER',
    //     },
    //   ],
    //   is_deleted: false,
    //   created_by: 1,
    //   modified_by: 2,
    //   created_at: new Date('2022-12-01T08:00:00.000+00:00'),
    //   modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
    // };
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
