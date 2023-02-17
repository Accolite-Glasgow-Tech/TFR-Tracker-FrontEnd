import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-widget-modal',
  templateUrl: './manage-widget-modal.component.html',
  styleUrls: ['./manage-widget-modal.component.scss'],
})
export class ManageWidgetModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public ref: MatDialogRef<ManageWidgetModalComponent>
  ) {}
  widgetsfalse: any;
  widgets: any = [
    {
      componentName: 'Client Location',
      present: true,
    },
    {
      componentName: 'Our Clients',
      present: true,
    },
    {
      componentName: 'TFR Status',
      present: true,
    },
    {
      componentName: 'Upcoming TFRs',
      present: true,
    },
  ];

  ngOnInit(): void {
    this.widgetsfalse = this.data.widgetdata;

    for (let i = 0; i < this.widgetsfalse.length; i++) {
      if (this.widgetsfalse[i].componentName === 'Client Location') {
        this.widgets[0].present = false;
      } else if (this.widgetsfalse[i].componentName === 'Our Clients') {
        this.widgets[1].present = false;
      } else if (this.widgetsfalse[i].componentName === 'TFR Status') {
        this.widgets[2].present = false;
      } else if (this.widgetsfalse[i].componentName === 'Upcoming TFRs') {
        this.widgets[3].present = false;
      }
    }
  }

  onClick(dat: any) {
    this.ref.close(dat);
  }

  isempty(present: boolean) {
    if (present === true) return ['isPresentstyle'];
    return ['notPresentstyle'];
  }
}
