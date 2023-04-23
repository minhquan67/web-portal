import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

declare var toastr: any;

@Injectable({
  providedIn: "root",
})
export class ToastrService {
  constructor(private _snackBar: MatSnackBar) { }

  showMessage(message: string, labelAction?: string, panelClass?: string) {
    const matSnackbarConfig: MatSnackBarConfig = {
      duration: 4000,
      panelClass: [panelClass? panelClass: 'default-panel'],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: {
        message: message
      }
    };
    this._snackBar.open(message, labelAction, matSnackbarConfig);
  }
}
