import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetApproachingProjectsComponent } from './widget-approaching-projects.component';

describe('WidgetApproachingProjectsComponent', () => {
  let component: WidgetApproachingProjectsComponent;
  let fixture: ComponentFixture<WidgetApproachingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetApproachingProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetApproachingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
