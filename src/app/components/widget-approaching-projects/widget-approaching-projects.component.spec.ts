import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetApproachingProjectDeadlineComponent } from './widget-approaching-projects.component';

describe('WidgetApproachingProjectDeadlineComponent', () => {
  let component: WidgetApproachingProjectDeadlineComponent;
  let fixture: ComponentFixture<WidgetApproachingProjectDeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetApproachingProjectDeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetApproachingProjectDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
