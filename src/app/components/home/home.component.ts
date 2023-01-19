import { Component, ViewChild } from '@angular/core';
import { GridsterComponent, IGridsterOptions } from 'angular2gridster';
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
