import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { IGridsterOptions, GridsterComponent } from 'angular2gridster';
import { ChartsComponent } from '../charts/charts.component';
import { WidgetApproachingProjectsComponent } from '../widget-approaching-projects/widget-approaching-projects.component';
import { WidgetVendorLocationComponent } from '../widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorProjectCountComponent } from '../widget-vendor-project-count/widget-vendor-project-count.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    responsiveOptions: [
      {
        breakpoint: 'sm',
        minWidth: 320,
        lanes: 1,
      },
      {
        breakpoint: 'md',
        minWidth: 768,
        lanes: 1,
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

  remove(): void {
    this.widgets.pop();
    console.log('Remove: LaneCount', this.getLaneCount());
    this.gridster.setOption('lanes', this.getLaneCount());
  }

  optionsChange(options: IGridsterOptions) {
    console.log('options change:', options.lanes);
  }
}
