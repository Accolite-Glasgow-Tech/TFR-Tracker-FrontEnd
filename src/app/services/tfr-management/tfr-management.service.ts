import { Injectable } from '@angular/core';
import {
  Milestone,
  Project,
  ProjectBasicDetails,
  ProjectResource,
} from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;

  constructor() {}

  updateDatabase() {
    console.log(this.project);
  }

  getProject(): Project | undefined {
    return this.project;
  }

  setProject(project: Project) {
    this.project = project;
  }

  getBasicDetails(): ProjectBasicDetails | undefined {
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

  getMilestones(): Milestone[] | undefined {
    return this.project?.milestones;
  }

  setMilestones(milestones: Milestone[]) {
    if (this.project !== undefined) {
      this.project.milestones = milestones;
      this.updateDatabase();
    }
  }

  getProjectResources(): ProjectResource[] | undefined {
    return this.project?.projectResources;
  }

  setProjectResources(projectResources: ProjectResource[]) {
    if (this.project !== undefined) {
      this.project.projectResources = projectResources;
      this.updateDatabase();
    }
  }
}
