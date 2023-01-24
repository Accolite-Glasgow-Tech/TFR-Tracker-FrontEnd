import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tfr-creation-dialog',
  templateUrl: './tfr-creation-dialog.component.html',
  styleUrls: ['./tfr-creation-dialog.component.scss'],
})
export class TfrCreationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      confirmText: string;
      cancelText: string;
    },
    private matDialogRef: MatDialogRef<TfrCreationDialogComponent>
  ) {}

  @HostListener('keydown.esc')
  public onEsc() {
    this.matDialogRef.close('false');
  }
}
