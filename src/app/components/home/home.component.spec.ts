import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ChartsComponent } from '../charts/charts.component';
import { WidgetApproachingProjectsComponent } from '../widget-approaching-projects/widget-approaching-projects.component';
import { WidgetClientLocationComponent } from '../widget-client-location/widget-client-location.component';
import { WidgetClientProjectCountComponent } from '../widget-client-project-count/widget-client-project-count.component';

import { HomeComponent } from './home.component';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let widgets = [
    {
      componentName: 'Client Location',
      present: true,
      componentType: WidgetClientLocationComponent,
    },
    {
      componentName: 'Our Clients',
      present: true,
      componentType: WidgetClientProjectCountComponent,
    },
    {
      componentName: 'TFR Status',
      present: true,
      componentType: ChartsComponent,
    },
    {
      componentName: 'Upcoming TFRs',
      present: true,
      componentType: WidgetApproachingProjectsComponent,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('after initialising should contain the 4 default widgets', () => {
    expect(component.widgets.length).toEqual(widgets.length);
    for (let i = 0; i < widgets.length; i++) {
      expect(
        component.widgets.find(function (widget) {
          return (
            widget.componentName === widgets[i].componentName &&
            widget.present === widgets[i].present &&
            widget.componentType === widgets[i].componentType
          );
        })
      ).toBeTruthy();
    }
  });

  it('should remove items successfully', () => {
    component.widgets = [...widgets];

    for (let i = 0; i < widgets.length; i++) {
      // widget should be in existing array
      expect(
        component.widgets.find(function (widget) {
          return (
            widget.componentName === widgets[i].componentName &&
            widget.present === widgets[i].present
          );
        })
      ).toBeTruthy();

      // remove the widget
      component.onClick_removeItem(widgets[i]);

      expect(component.widgets.length).toEqual(widgets.length - (i + 1));
      expect(
        component.widgets.find(function (widget) {
          return (
            widget.componentName === widgets[i].componentName &&
            widget.present === widgets[i].present
          );
        })
      ).toBeUndefined();

      expect(component.widgetsfalse.length).toEqual(i + 1);

      expect(
        component.widgetsfalse.find(function (widget) {
          return (
            widget.componentName === widgets[i].componentName &&
            widget.present === false
          );
        })
      ).toBeTruthy();
    }

    expect(component.widgets.length).toEqual(0);
    expect(component.widgetsfalse.length).toEqual(widgets.length);
  });
});
