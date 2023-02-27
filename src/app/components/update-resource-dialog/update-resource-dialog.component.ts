import { Component, HostListener, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AddResource,
  UpdateResourceDialogContent,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-update-resource-dialog',
  templateUrl: './update-resource-dialog.component.html',
  styleUrls: ['./update-resource-dialog.component.scss'],
})
export class UpdateResourceDialogComponent {
  allocationFormGroup!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: UpdateResourceDialogContent,
    private matDialogRef: MatDialogRef<UpdateResourceDialogComponent>
  ) {}

  @HostListener('keydown.esc')
  public onEsc() {
    this.matDialogRef.close('false');
  }

  valueChanges(allocationFormGroup: FormGroup) {
    this.allocationFormGroup = allocationFormGroup;
  }

  updateResource(): AddResource {
    return {
      resource_name: this.allocationFormGroup.controls['resource_name'].value,
      role: this.allocationFormGroup.controls['role'].value,
      seniority: this.allocationFormGroup.controls['seniorityLevel'].value,
    };
  }
}
