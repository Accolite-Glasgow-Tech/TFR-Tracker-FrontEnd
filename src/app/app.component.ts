import { Component, ViewChild } from '@angular/core';
import { RoutesService } from './routes.service';
import { IGridsterOptions, GridsterComponent } from 'angular2gridster';
import { ChartsComponent } from './components/charts/charts.component';
import { WidgetVendorLocationComponent } from './components/widget-vendor-location/widget-vendor-location.component';
import { WidgetVendorProjectCountComponent } from './components/widget-vendor-project-count/widget-vendor-project-count.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
//   @ViewChild(GridsterComponent) gridster!: GridsterComponent;
//   // title = 'TFR-Management';

//   widgets: any[] = [{ componentType: WidgetVendorLocationComponent,componentName:"Client Location" },
//     { componentType: WidgetVendorProjectCountComponent,componentName:"Our Clients" },
//   ];

//   gridsterOptions: IGridsterOptions = {
//     lanes: this.getLaneCount(),
//     floating: true,
//     direction: 'vertical',
//     dragAndDrop: false,
//     resizable: false,
//     useCSSTransforms: false,
//   };

//   getLaneCount(): number {
//     // if (this.widgets.length > 6) {
//     //   return 4;
//     // }

//     // if (this.widgets.length > 4) {
//     //   return 3;
//     // }

//     // if (this.widgets.length === 4) {
//     //   return 2;
//     // }

//     // if (this.widgets.length < 4) {
//     //   return this.widgets.length;
//     // }
//     return 2;
//   }

//   remove(): void {
//     this.widgets.pop();
//     console.log('Remove: LaneCount', this.getLaneCount());
//     this.gridster.setOption('lanes', this.getLaneCount());
//   }

//   optionsChange(options: IGridsterOptions) {
//     console.log('options change:', options.lanes);
//   }
// }
}