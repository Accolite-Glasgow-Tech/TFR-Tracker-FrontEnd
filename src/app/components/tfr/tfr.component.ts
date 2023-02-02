import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO, Project } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
  providers: [TfrManagementService],
})
export class TfrComponent implements OnInit {
  TfrId!: Number;
  errorMessage: string = '';

  getResourceNameObserver = {
    next: (data: AllocatedResourceTypeDTO[]) => {
      this.tfrManagementService.projectResourcesWithNames = data;
      this.tfrManagementService.projectResourcesWithNames.forEach(
        (project_resourceWithName: AllocatedResourceTypeDTO) => {
          project_resourceWithName.role = project_resourceWithName.role.replace(
            /_/g,
            ' '
          );
        }
      );
    },
  };

  getProjectObserver = {
    next: (response: Data) => {
      let status: number = response['project']['status'];
      let project: Project = response['project']['body'];
      if (status === 200) {
        this.tfrManagementService.project = project;
        this.tfrManagementService
          .getResourcesNamesByProjectIdFromDatabase(project.id)
          .subscribe(this.getResourceNameObserver);
        this.tfrManagementService.setVendorName(project.vendor_id);
      } else {
        this.tfrManagementService.apiError = true;
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(TfrManagementService)
    protected tfrManagementService: TfrManagementService
  ) {}

  ngOnInit() {
    this.TfrId = Number(this.route.snapshot.paramMap.get('id'));

    /*
      Error validation for the path variable.
      The path variable (the project_id) is expected to be a number.
    */
    if (!Number.isInteger(this.TfrId)) {
      this.router.navigate(['/home']);
    } else {
      this.route.paramMap.subscribe((result) => {
        this.TfrId = Number(result.get('id'));
      });

      /*
        The data that will be rendered in the screen is pre-fetched before the component
        is loaded. This component has a resolver (refer to /services/project-resolver) that
        fetches the project to be displayed.
      */
      this.route.data.subscribe(this.getProjectObserver);
    }
  }

  /*
    Takes the user to the URL that enable him to edit the current
    project being displayed.
  */
  redirectToEditTfr() {
    this.router.navigate(['/tfr/' + this.TfrId + '/edit']);
  }
}
