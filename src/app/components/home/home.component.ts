import { Component, Inject, ViewChild } from '@angular/core';
import { GridsterComponent, IGridsterOptions } from 'angular2gridster';
import { ChartsComponent } from '../charts/charts.component';
import { WidgetApproachingProjectsComponent } from '../widget-approaching-projects/widget-approaching-projects.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WidgetVendorLocationComponent } from '../widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorProjectCountComponent } from '../widget-vendor-project-count/widget-vendor-project-count.component';
import { ManageWidgetModalComponent } from '../manage-widget-modal/manage-widget-modal.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MdbModalService],
})
export class HomeComponent {
  @ViewChild(GridsterComponent) gridster!: GridsterComponent;
  @ViewChild(WidgetVendorLocationComponent)
  WidgetVendorLocationComponent!: WidgetVendorLocationComponent;
  @ViewChild(WidgetVendorProjectCountComponent)
  WidgetVendorProjectCountComponent!: WidgetVendorProjectCountComponent;
  @ViewChild(ChartsComponent) ChartsComponent!: ChartsComponent;
  @ViewChild(WidgetApproachingProjectsComponent)
  WidgetApproachingProjectsComponent!: WidgetApproachingProjectsComponent;

  constructor(private matdialog: MatDialog) {}

  widgets: any[] = [
    {
      componentName: 'Client Location',
      present: true,
      componentType: WidgetVendorLocationComponent,
    },
    {
      componentName: 'Our Clients',
      present: true,
      componentType: WidgetVendorProjectCountComponent,

    },
    {
      componentName: 'TFR Status',
      present: true,
      componentType: ChartsComponent,

    },
    {
      componentName: 'Upcoming Projects',
      present: true,
      componentType: WidgetApproachingProjectsComponent,

    },
  ];

  widgetsfalse: any[] = [];

  gridsterOptions: IGridsterOptions = {
    lanes: this.getLaneCount(),
    floating: true,
    direction: 'vertical',
    dragAndDrop: false,
    resizable: false,
    useCSSTransforms: false,
    widthHeightRatio: 2,
    responsiveOptions: [
      {
        breakpoint: 'sm',
        minWidth: 0,
        lanes: 1,
      },
      {
        breakpoint: 'sm',
        minWidth: 320,
        lanes: 1,
      },
      {
        breakpoint: 'md',
        minWidth: 875,
        lanes: 2,
      },
      {
        breakpoint: 'lg',
        minWidth: 870,
        lanes: 2,
      },
      {
        breakpoint: 'xl',
        minWidth: 1800,
        lanes: 2,
      },
    ],
  };

  getLaneCount(): number {
    return 2;
  }

  public onClick_removeItem(_widget: any): void {
    this.widgets.splice(this.widgets.indexOf(_widget), 1);
    this.widgetsfalse.push({
      componentName: _widget.componentName,
      present: false,
      componentType: _widget.ChartsComponent,
    });
  }

  optionsChange(options: IGridsterOptions) {
    // console.log('options change:', options.lanes);
  }

  OpenPopup() {
    const popup = this.matdialog.open(ManageWidgetModalComponent, {
      width: '35%',
      height: '300px',
      enterAnimationDuration: '500ms',
      data: { widgetdata: this.widgetsfalse },
    });

    popup.afterClosed().subscribe((item) => {
      if (item === 'TFR Status') {
        this.widgetsfalse.splice(
          this.widgetsfalse.findIndex((x) => x.componentName === 'TFR Status'),
          1
        );
        this.widgets.push({
          componentName: 'TFR Status',
          present: true,
          componentType: ChartsComponent,
        });
      }

      if (item === 'Upcoming Projects') {
        this.widgetsfalse.splice(
          this.widgetsfalse.findIndex(
            (x) => x.componentName === 'Upcoming Projects'
          ),
          1
        );
        this.widgets.push({
          componentName: 'Upcoming Projects',
          present: true,
          componentType: WidgetApproachingProjectsComponent,

        });
      }

      if (item === 'Our Clients') {
        this.widgetsfalse.splice(
          this.widgetsfalse.findIndex((x) => x.componentName === 'Our Clients'),
          1
        );
        this.widgets.push({
          componentName: 'Our Clients',
          present: true,
          componentType: WidgetVendorProjectCountComponent,

        });
      }

      if (item === 'Client Location') {
        this.widgetsfalse.splice(
          this.widgetsfalse.findIndex(
            (x) => x.componentName === 'Client Location'
          ),
          1
        );
        this.widgets.push({
          componentName: 'Client Location',
          present: true,
          componentType: WidgetVendorLocationComponent,

        });
      }
    });
  }
}
