import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { userService } from 'src/app/services/user/user.service';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';

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
  sessionStorage = sessionStorage;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    @Inject(TfrManagementService)
    protected tfrManagementService: TfrManagementService,
    @Inject(userService) protected userService: userService
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
      this.route.data.subscribe(this.tfrManagementService.getProjectObserver);
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
    this.notes = this.tfrManagementService.project?.notes ?? '';
    const dialogRef = this.dialog.open(NotesDialogComponent, {
      panelClass: 'notes-popup-window', // class defined in global styles.scss
      data: {
        notes: this.notes,
        editable: this.tfrManagementService.canEdit,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.notes = result ?? this.notes;
        this.tfrManagementService.setNotes(this.notes);
      }
    });
  }
}
