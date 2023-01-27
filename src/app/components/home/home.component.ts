import { Component, ViewChild } from '@angular/core';
import { GridsterComponent, IGridsterOptions } from 'angular2gridster';
import { ChartsComponent } from '../charts/charts.component';
import { WidgetApproachingProjectsComponent } from '../widget-approaching-projects/widget-approaching-projects.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { WidgetVendorLocationComponent } from '../widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorProjectCountComponent } from '../widget-vendor-project-count/widget-vendor-project-count.component';
import { ManageWidgetModalComponent } from '../manage-widget-modal/manage-widget-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[MdbModalService]
})
export class HomeComponent {

  modalRef: MdbModalRef<ManageWidgetModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}



  @ViewChild(GridsterComponent) gridster!: GridsterComponent;
  @ViewChild(WidgetVendorLocationComponent)
  WidgetVendorLocationComponent!: WidgetVendorLocationComponent;
  @ViewChild(WidgetVendorProjectCountComponent)
  WidgetVendorProjectCountComponent!: WidgetVendorProjectCountComponent;
  @ViewChild(ChartsComponent) ChartsComponent!: ChartsComponent;
  @ViewChild(WidgetApproachingProjectsComponent)
  WidgetApproachingProjectsComponent!: WidgetApproachingProjectsComponent;

  widgets: any[] = [
    {
      componentType: WidgetVendorLocationComponent,
      componentName: 'Client Location',
    },
    {
      componentType: WidgetVendorProjectCountComponent,
      componentName: 'Our Clients',
    },
    { componentType: ChartsComponent, componentName: 'TFR Status' },
    {
      componentType: WidgetApproachingProjectsComponent,
      componentName: 'Upcoming Projects',
    },
  ];

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

  public onClick_AddClientLocationWidget(): void {
    this.widgets.push({
      componentName: 'Client Location',
      componentType: WidgetVendorLocationComponent,
    });
  }

  public onClick_AddOurClientsWidget(): void {
    this.widgets.push({
      componentName: 'Our Clients',
      componentType: WidgetVendorProjectCountComponent,
    });
  }

  public onClick_AddTFRStatusWidget(): void {
    this.widgets.push({
      componentName: 'TFR Status',
      componentType: ChartsComponent,
    });
  }

  public onClick_AddUpcomingProjectsWidget(): void {
    this.widgets.push({
      componentName: 'Upcoming Projects',
      componentType: WidgetApproachingProjectsComponent,
    });
  }

  public onClick_removeItem(_widget: any): void {
    this.widgets.splice(this.widgets.indexOf(_widget), 1);
  }

  optionsChange(options: IGridsterOptions) {
    console.log('options change:', options.lanes);
  }

  // checkForWidget(widget: string): boolean {
  //   return this.widgets.some(i => i.componentName === widget);
  // }

  openModal() {
   this.modalRef = this.modalService.open(ManageWidgetModalComponent)

}


  addItem(newItem: string) {
    this.widgets.push({
      componentName: newItem,
      componentType: WidgetApproachingProjectsComponent,
    });
  }

  

}