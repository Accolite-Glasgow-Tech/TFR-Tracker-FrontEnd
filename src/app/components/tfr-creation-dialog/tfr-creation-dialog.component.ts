import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tfrCreationDialogContent } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-tfr-creation-dialog',
  templateUrl: './tfr-creation-dialog.component.html',
  styleUrls: ['./tfr-creation-dialog.component.scss'],
})
export class TfrCreationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: tfrCreationDialogContent,
    private matDialogRef: MatDialogRef<TfrCreationDialogComponent>
  ) {}

  @HostListener('keydown.esc')
  public onEsc() {
    this.matDialogRef.close('false');
  }
}
