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
  Vendor,
} from '../../types/types';
import { ApiService } from '../api.service';
import { ResourceService } from '../resource/resource.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;

  updateProjectToResourceMappingURL =
    APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/projects';
  // projectURL = APPCONSTANTS.APICONSTANTS.BASE_URL + '/projects/' + project_id;
  projectURL = 'assets/json/project.json';
  statusUpdateURL = 'assets/json/projectStatusUpdate.json';
  projectResourcesWithNames!: AllocatedResourceType[];
  vendorSpecificObject!: Object;
  vendorName: string = '';

  constructor(
    private http: HttpClient,
    private resourceService: ResourceService,
    private snackBarService: SnackBarService,
    private apiService: ApiService
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

  get getMilestones(): Milestone[] | undefined {
    return this.project?.milestones;
  }

  get getProjectResourcesWithNames(): AllocatedResourceType[] {
    return this.projectResourcesWithNames;
  }

  get getProjectResources(): ProjectResource[] | undefined {
    return this.project?.project_resources;
  }

  get getProject(): Project | undefined {
    return this.project;
  }

  get getVendorSpecificObject(): any {
    return this.vendorSpecificObject;
  }

  get getVendorName(): string {
    return this.vendorName;
  }

  setVendorSpecificObject(vendorSpecificObject: string) {
    while (typeof vendorSpecificObject === 'string') {
      vendorSpecificObject = JSON.parse(vendorSpecificObject);
    }
    this.vendorSpecificObject = vendorSpecificObject;
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
      this.setVendorName(projectBasicDetails.vendor_id);
      this.setVendorSpecificObject(projectBasicDetails.vendor_specific);
      this.updateBasicDetails();
    }
  }

  setVendorName(vendor_id: number) {
    this.apiService.getVendorData().subscribe((result: Vendor[]) => {
      this.vendorName = result.find(
        (vendor: Vendor) => vendor.id === vendor_id
      )!.name;
    });
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

  setMilestones(milestones: Milestone[]) {
    if (this.project !== undefined) {
      this.project.milestones = milestones;
      this.updateDatabase();
    }
  }

  setProjectResources(project_resources: ProjectResource[]) {
    if (this.project !== undefined) {
      this.project.project_resources = project_resources;
    }
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
    this.projectResourcesWithNames = [...projectResourcesWithNames];
    this.setProjectResources(newArray);
  }

  /*
    pushes the changes to the resources for this project to the database
  */
  updateProjectToResourceMapping() {
    this.http
      .put(
        this.updateProjectToResourceMappingURL + '/' + this.getProjectId,
        this.getProjectResources
      )
      .subscribe((response) => {
        this.snackBarService.showSnackBar('Updates saved to database', 2000);
      });
  }

  getFromDatabase(project_id: Number): Observable<Project> {
    return this.http.get<Project>(this.projectURL);
  }

  /*
    Returns more details information about the resources associated with the project.
    Each object contains the current project_id, the resource's id, name, email, role.
  */
  getResourcesNamesByProjectIdFromDatabase(project_id: Number) {
    this.http
      .get<AllocatedResourceType[]>(
        APPCONSTANTS.APICONSTANTS.BASE_URL +
          '/resources/projects/' +
          project_id +
          '/names'
      )
      .subscribe((data: AllocatedResourceType[]) => {
        this.projectResourcesWithNames = data;
        this.projectResourcesWithNames.forEach(
          (project_resourceWithName: AllocatedResourceType) => {
            project_resourceWithName.role =
              project_resourceWithName.role.replace(/_/g, ' ');
          }
        );
      });
  }

  updateStatusToDatabase(): Observable<boolean> {
    /* 
      When API is ready, need to make a put request to the database
      to update the status.
    */
    return this.http.get<boolean>(this.statusUpdateURL);
  }
}
