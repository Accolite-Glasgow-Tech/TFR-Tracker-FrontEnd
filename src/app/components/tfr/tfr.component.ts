import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { ResourceListType } from 'src/app/types/types';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
  providers: [TfrManagementService],
})
export class TfrComponent implements OnInit {
  TfrId!: Number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      this.route.data.subscribe(({ project }) => {
        if (project) {
          this.tfrManagementService.setVendorSpecificObject(
            project.vendor_specific
          );
          this.tfrManagementService.project = project;
          this.tfrManagementService.getResourcesNamesByProjectIdFromDatabase(
            project.id
          );
        }
      });
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
