import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

/*
  snack bar re-usable component

  appears at the bottom of the screen
*/
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  /*
    Input parameters:
    - content: Information to be displayed in snackbar.
    - duration: How long should the snackbar be displayed for.
  */
  showSnackBar(content: string, duration: number = 2000) {
    this.snackBar.open(content, 'OK', {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
