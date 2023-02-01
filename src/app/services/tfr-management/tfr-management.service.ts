import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TfrCreationDialogComponent } from 'src/app/components/tfr-creation-dialog/tfr-creation-dialog.component';
import { resourceProjectsURL } from 'src/app/shared/constants';
import {
  AllocatedResourceTypeDTO,
  Milestone,
  MilestoneDTO,
  Project,
  ProjectBasicDetails,
  ProjectMilestoneDTO,
  ProjectResourceDTO,
  VendorDTO,
} from 'src/app/shared/interfaces';
import { getAllocatedResourcesURL } from 'src/app/shared/utils';
import { ApiService } from '../api/api.service';
import { ResourceService } from '../resource/resource.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class TfrManagementService {
  public project!: Project | undefined;
  projectResourcesWithNames!: AllocatedResourceTypeDTO[];

  vendorName: string = '';
  apiError: boolean = false;

  updateProjectToDatabaseObserver = {
    next: (response: Data) => {
      if (this.project) {
        this.project.version = Number(response);
      }
      this.snackBarService.showSnackBar('Updates saved to database', 2000);
    },
    error: (err: HttpErrorResponse) => {
      let dialogRef!: MatDialogRef<TfrCreationDialogComponent, any>;
      if (err.status === 500) {
        dialogRef = this.dialog.open(TfrCreationDialogComponent, {
          data: {
            title: 'Server error',
            content: 'Could not update the database',
            confirmText: 'Ok',
            cancelText: '',
          },
        });
      } else if (err.status === 412) {
        dialogRef = this.dialog.open(TfrCreationDialogComponent, {
          data: {
            title: 'Save unsuccessful',
            content:
              'Updating an older version of project. Please see the new changes',
            confirmText: 'Redirect',
            cancelText: '',
          },
        });
      }

      dialogRef.afterClosed().subscribe((result: string) => {
        if (result === 'true') {
          this.router.navigate([`/tfr/${this.getProjectId}`]);
        }
      });
    },
  };

  constructor(
    private http: HttpClient,
    private resourceService: ResourceService,
    private snackBarService: SnackBarService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  get getProjectId(): number | undefined {
    return this.project?.id;
  }

  get getProjectName(): string | undefined {
    return this.project?.name;
  }

  get getMilestones(): Milestone[] | undefined {
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

  get getVendorName(): string {
    return this.vendorName;
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
          created_by: 1,
          modified_by: NaN,
          created_at: new Date('2022-12-05T10:00:00.000+00:00'),
          modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
        };
        this.createProjectInDatabase();
      } else {
        this.project.name = projectBasicDetails.name;
        this.project.start_date = projectBasicDetails.start_date;
        this.project.end_date = projectBasicDetails.end_date;
        this.project.vendor_id = projectBasicDetails.vendor_id;
        this.project.vendor_specific = projectBasicDetails.vendor_specific;
        this.updateProjectToDatabase();
      }
      this.setVendorName(projectBasicDetails.vendor_id);
    }
  }

  createProjectInDatabase() {
    this.apiService.postProject(this.project).subscribe((response) => {
      if (this.project) {
        this.project.id = Number(response);
        this.project.version++;
        this.snackBarService.showSnackBar('Saved to database', 2000);
      }
    });
  }

  updateProjectToDatabase() {
    this.apiService
      .putProject(this.project)
      .subscribe(this.updateProjectToDatabaseObserver);
  }

  setVendorName(vendor_id: number) {
    this.apiService.getVendors.subscribe((result: VendorDTO[]) => {
      this.vendorName = result.find(
        (vendor: VendorDTO) => vendor.id === vendor_id
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

  set milestones(milestones: Milestone[]) {
    if (this.project !== undefined) {
      this.project.milestones = milestones;
    }
  }

  stripTempIds(milestones: Milestone[]): MilestoneDTO[] {
    let strippedMilestones: MilestoneDTO[] = milestones.map((milestone) => {
      if (milestone.id > 0) {
        return milestone;
      }
      let { id, ...cleanedMilestone } = milestone;
      return cleanedMilestone;
    });
    return strippedMilestones;
  }

  projectStripTempIds(milestonesToStrip: Milestone[]): ProjectMilestoneDTO {
    if (this.project) {
      let projectDTO: ProjectMilestoneDTO = this.project;
      projectDTO.milestones = this.stripTempIds(milestonesToStrip);
      return projectDTO;
    }
    throw new Error('No project defined');
  }

  putMilestones(milestones: Milestone[]): Observable<{}> {
    return this.project == undefined
      ? new Observable<{}>((subscriber) => {
          subscriber.error('project undefined');
          subscriber.complete;
        })
      : this.apiService.putProject(this.projectStripTempIds(milestones));
  }

  setProjectResources(project_resources: ProjectResourceDTO[]) {
    if (this.project !== undefined) {
      this.project.project_resources = project_resources;
    }
  }

  setProjectResourcesWithNames(
    projectResourcesWithNames: AllocatedResourceTypeDTO[]
  ) {
    const newArray: ProjectResourceDTO[] = projectResourcesWithNames.map(
      ({ resource_name, resource_email, ...keepAttrs }) => {
        keepAttrs.role = this.resourceService.getAssociatedEnumRole(
          keepAttrs.role
        );
        return {
          resource_id: keepAttrs.resource_id,
          project_id: keepAttrs.project_id,
          role: keepAttrs.role,
          is_deleted: keepAttrs.is_deleted,
        };
      }
    );
    this.projectResourcesWithNames = [...projectResourcesWithNames];
    this.setProjectResources(newArray);
  }

  /*
    pushes the changes to the resources for this project to the database
  */
  updateProjectToResourceMapping() {
    this.putProjectToResource(this.project).subscribe(
      this.updateProjectToDatabaseObserver
    );
  }

  private putProjectToResource(project: Project | undefined) {
    return this.http.post(resourceProjectsURL, project);
  }

  getFromDatabase(project_id: Number): Observable<HttpResponse<Project>> {
    return this.apiService.getProject(project_id);
  }

  extractProject(value: HttpResponse<Project>) {
    this.project = value.body ?? undefined;
    return value;
  }

  /*
    Returns more details information about the resources associated with the project.
    Each object contains the current project_id, the resource's id, name, email, role.
  */
  getResourcesNamesByProjectIdFromDatabase(
    project_id: Number
  ): Observable<AllocatedResourceTypeDTO[]> {
    return this.http.get<AllocatedResourceTypeDTO[]>(
      getAllocatedResourcesURL(project_id)
    );
  }

  updateStatusToDatabase(): Observable<boolean> {
    /*
      When API is ready, need to make a put request to the database
      to update the status from DRAFT to AGREED.
    */
    return this.apiService.putStatusAgreed(this.project!.id);
  }
}
