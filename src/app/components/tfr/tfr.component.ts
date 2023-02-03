import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

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
    },
  };

  getProjectObserver = {
    next: (response: Data) => {
      let project = response['project'];
      this.tfrManagementService.project = project;
      this.apiService
        .getResourcesNamesByProjectIdFromDatabase(project.id)
        .subscribe(this.getResourceNameObserver);
      this.tfrManagementService.setClientName(project.client_id);
    },
    error: () => {
      this.tfrManagementService.apiError = true;
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(TfrManagementService)
    protected tfrManagementService: TfrManagementService,
    @Inject(ApiService) private apiService: ApiService
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
