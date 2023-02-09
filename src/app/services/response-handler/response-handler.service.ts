import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TfrCreationDialogComponent } from 'src/app/components/tfr-creation-dialog/tfr-creation-dialog.component';
import { SnackBarService } from '../snack-bar/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  unsavedChangesDialogue() {
    this.dialog.open(TfrCreationDialogComponent, {
      data: {
        title: 'Unsaved Changes',
        content: 'Save or reset before moving on',
        confirmText: 'OK',
        cancelText: '',
      },
    });
  }

  redirectDialogue() {
    let dialogRef!: MatDialogRef<TfrCreationDialogComponent, any>;
    dialogRef = this.dialog.open(TfrCreationDialogComponent, {
      data: {
        title: 'Save unsuccessful',
        content:
          'Updating an older version of project. Please see the new changes',
        confirmText: 'Refresh',
        cancelText: '',
      },
    });
    return dialogRef;
  }

  outOfDateProject() {
    let dialogRef: MatDialogRef<TfrCreationDialogComponent, any> =
      this.redirectDialogue();
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'true') {
        this.reloadPage();
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }

  handleBadProjectUpdate(err: HttpErrorResponse) {
    if (err.status === 412) {
      this.outOfDateProject();
    } else if (err.status === 400) {
      this.badRequest();
    } else {
      this.badSave();
    }
  }

  badGet() {
    this.snackBarService.showSnackBar('Error. Try again', 5000);
  }

  badSave() {
    this.snackBarService.showSnackBar('Save Unsuccessful. Try again', 5000);
  }

  goodSave() {
    this.snackBarService.showSnackBar('Saved to database', 3000);
  }

  goodRegister() {
    this.snackBarService.showSnackBar('Successfully registered', 3000);
  }
  badRequest() {
    this.snackBarService.showSnackBar('Bad request. Try again', 5000);
  }
}
