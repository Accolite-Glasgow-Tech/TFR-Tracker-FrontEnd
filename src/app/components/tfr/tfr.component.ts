import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { log } from 'src/app/shared/utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tfr',
  templateUrl: './tfr.component.html',
  styleUrls: ['./tfr.component.scss'],
  providers: [TfrManagementService],
})
export class TfrComponent implements OnInit {
  TfrId!: Number;
  errorMessage: string = '';
  notes: string = '';

  getResourceNameObserver = {
    next: (data: AllocatedResourceTypeDTO[]) => {
      this.tfrManagementService.projectResourcesWithNames = data;
    },
  };

  getProjectObserver = {
    next: (response: Data) => {
      let status = response['project']['status'];
      if (status === 500) {
        this.tfrManagementService.apiError = true;
      } else if (status === 503) {
        this.tfrManagementService.serverDown = true;
      } else {
        let project = response['project'];
        this.tfrManagementService.project = project;
        this.apiService
          .getResourcesNamesByProjectIdFromDatabase(project.id)
          .subscribe(this.getResourceNameObserver);
        this.tfrManagementService.setClientName(project.client_id);
        this.notes = this.tfrManagementService.project?.notes ?? '';
      }
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
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

  openNotes() {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      width: '250px',
      data: this.notes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notes = result ?? this.notes;
        this.tfrManagementService.setNotes(this.notes);
      }
    });
  }
}
