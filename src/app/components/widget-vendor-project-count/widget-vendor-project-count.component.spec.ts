import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetVendorProjectCountComponent } from './widget-vendor-project-count.component';

describe('WidgetVendorProjectCountComponent', () => {
  let component: WidgetVendorProjectCountComponent;
  let fixture: ComponentFixture<WidgetVendorProjectCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetVendorProjectCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetVendorProjectCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
