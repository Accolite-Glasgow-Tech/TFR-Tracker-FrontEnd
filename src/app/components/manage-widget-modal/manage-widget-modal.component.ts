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
  widgetsfalse: any; //store widgets which are not present in homescreen , get this data from home page

  /**
   * store the widgets which is to be displayed in the modal popup :
   * present:true    =>     widget present in home page and highlight the slide toggle button
   * present:false   =>     widget not present in home page and do not highlight the slide toggle button
   */

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

    // change the widgets.present to false only if the widget is present in widgetsfalse list
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
}
