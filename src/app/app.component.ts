import { Component, ViewChild } from '@angular/core';
import { RoutesService } from './routes.service';
import { IGridsterOptions, GridsterComponent } from 'angular2gridster';
import { ChartsComponent } from './components/charts/charts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(GridsterComponent) gridster!: GridsterComponent;

  widgets: any[] = [{}];

  gridsterOptions: IGridsterOptions = {
    lanes: this.getLaneCount(),
    floating: true,
    direction: 'vertical',
    dragAndDrop: false,
    resizable: false,
    useCSSTransforms: false,
  };

  getLaneCount(): number {
    if (this.widgets.length > 6) {
      return 4;
    }

    if (this.widgets.length > 4) {
      return 3;
    }

    if (this.widgets.length === 4) {
      return 2;
    }

    if (this.widgets.length < 4) {
      return this.widgets.length;
    }
    return this.widgets.length;
  }

  TFRStatusChart(): void {
    this.widgets.push({});
    console.log('Add: LaneCount', this.getLaneCount());
    this.gridster.setOption('lanes', this.getLaneCount());
  }

  VendorProjectCountChart(): void {
    this.widgets.push({});
    console.log('Add: LaneCount', this.getLaneCount());
    this.gridster.setOption('lanes', this.getLaneCount());
  }

  VendorLocationChart(): void {
    this.widgets.push({});
    console.log('Add: LaneCount', this.getLaneCount());
    this.gridster.setOption('lanes', this.getLaneCount());
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
