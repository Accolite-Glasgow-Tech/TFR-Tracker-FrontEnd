import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridsterComponent, IGridsterOptions } from 'angular2gridster';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ApiService } from 'src/app/services/api/api.service';
import { ChartsComponent } from '../charts/charts.component';
import { ManageWidgetModalComponent } from '../manage-widget-modal/manage-widget-modal.component';
import { WidgetApproachingProjectsComponent } from '../widget-approaching-projects/widget-approaching-projects.component';
import { WidgetClientLocationComponent } from '../widget-client-location/widget-client-location.component';
import { WidgetClientProjectCountComponent } from '../widget-client-project-count/widget-client-project-count.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MdbModalService, ApiService],
})
export class HomeComponent implements OnInit {
  @ViewChild(GridsterComponent) gridster!: GridsterComponent;
  @ViewChild(WidgetClientLocationComponent)
  WidgetClientLocationComponent!: WidgetClientLocationComponent;
  @ViewChild(WidgetClientProjectCountComponent)
  WidgetClientProjectCountComponent!: WidgetClientProjectCountComponent;
  @ViewChild(ChartsComponent) ChartsComponent!: ChartsComponent;
  @ViewChild(WidgetApproachingProjectsComponent)
  WidgetApproachingProjectsComponent!: WidgetApproachingProjectsComponent;

  widgets: any[] = []; // holds the list of widgets to show in home page
  widgetsfalse: any[] = []; // holds the list of widgets to not show in home page
  flag = 0;

  constructor(private matdialog: MatDialog) {}
  ngOnInit() {
    this.widgets.push({
      componentName: 'Client Location',
      present: true,
      componentType: WidgetClientLocationComponent,
    });
    this.widgets.push({
      componentName: 'Our Clients',
      present: true,
      componentType: WidgetClientProjectCountComponent,
    });
    this.widgets.push({
      componentName: 'TFR Status',
      present: true,
      componentType: ChartsComponent,
    });
    this.widgets.push({
      componentName: 'Upcoming TFRs',
      present: true,
      componentType: WidgetApproachingProjectsComponent,
    });
  }

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
      height: '330px',
      width: '350px',
      panelClass: 'popup-window', // class defined in global styles.scss
      enterAnimationDuration: '500ms',
      data: { widgetdata: this.widgetsfalse },
    });

    popup.afterClosed().subscribe((item) => {
      for (let i = 0; i < item.length; i++) {
        this.flag = 0;

        if (item[i] === 'TFR Status') {
          //check if the widget clicked is already present in the home page : to avoid duplicate copy of widgets in home page
          for (let j = 0; j < this.widgets.length; j++) {
            if (this.widgets[j].componentName === item[i]) {
              this.flag = 1;
            }
          }
          // if widget is not present in home screen then add the widget in the home page
          if (this.flag === 0) {
            this.widgets.push({
              componentName: 'TFR Status',
              present: true,
              componentType: ChartsComponent,
            });

            this.widgetsfalse.splice(
              this.widgetsfalse.findIndex(
                (x) => x.componentName === 'TFR Status'
              ),
              1
            );
          }
          // if widget is present in the home page, then remove it from widgets and add in widgetsfalse list
          else {
            this.widgets.splice(
              this.widgets.findIndex((x) => x.componentName === 'TFR Status'),
              1
            );
            this.widgetsfalse.push({
              componentName: 'TFR Status',
              present: false,
              componentType: ChartsComponent,
            });
          }
        }

        if (item[i] === 'Upcoming TFRs') {
          //check if the widget clicked is already present in the home page
          for (let j = 0; j < this.widgets.length; j++) {
            if (this.widgets[j].componentName === item[i]) {
              this.flag = 1;
            }
          }
          // if widget is not present in home screen then show the widget.
          if (this.flag === 0) {
            this.widgets.push({
              componentName: 'Upcoming TFRs',
              present: true,
              componentType: WidgetApproachingProjectsComponent,
            });

            this.widgetsfalse.splice(
              this.widgetsfalse.findIndex(
                (x) => x.componentName === 'Upcoming TFRs'
              ),
              1
            );
          }
          // if widget is present in the home page, then remove it from widgets and add in widgetsfalse list
          else {
            this.widgets.splice(
              this.widgets.findIndex(
                (x) => x.componentName === 'Upcoming TFRs'
              ),
              1
            );
            this.widgetsfalse.push({
              componentName: 'Upcoming TFRs',
              present: false,
              componentType: WidgetApproachingProjectsComponent,
            });
          }
        }

        if (item[i] === 'Our Clients') {
          //check if the widget clicked is already present in the home page
          for (let j = 0; j < this.widgets.length; j++) {
            if (this.widgets[j].componentName === item[i]) {
              this.flag = 1;
            }
          }
          // if widget is not present in home screen then show the widget.
          if (this.flag === 0) {
            this.widgets.push({
              componentName: 'Our Clients',
              present: true,
              componentType: WidgetClientProjectCountComponent,
            });
            this.widgetsfalse.splice(
              this.widgetsfalse.findIndex(
                (x) => x.componentName === 'Our Clients'
              ),
              1
            );
          } else {
            this.widgets.splice(
              this.widgets.findIndex((x) => x.componentName === 'Our Clients'),
              1
            );
            this.widgetsfalse.push({
              componentName: 'Our Clients',
              present: false,
              componentType: WidgetClientProjectCountComponent,
            });
          }
        }

        if (item[i] === 'Client Location') {
          //check if the widget clicked is already present in the home page
          for (let j = 0; j < this.widgets.length; j++) {
            if (this.widgets[j].componentName === item[i]) {
              this.flag = 1;
            }
          }
          // if widget is not present in home screen then show the widget.
          if (this.flag === 0) {
            this.widgets.push({
              componentName: 'Client Location',
              present: true,
              componentType: WidgetClientLocationComponent,
            });

            this.widgetsfalse.splice(
              this.widgetsfalse.findIndex(
                (x) => x.componentName === 'Client Location'
              ),
              1
            );
          } else {
            this.widgets.splice(
              this.widgets.findIndex(
                (x) => x.componentName === 'Client Location'
              ),
              1
            );
            this.widgetsfalse.push({
              componentName: 'Client Location',
              present: false,
              componentType: WidgetClientLocationComponent,
            });
          }
        }
      }
    });
  }
}
