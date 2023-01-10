import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetVendorLocationComponent } from './widget-vendor-location.component';

describe('WidgetVendorLocationComponent', () => {
  let component: WidgetVendorLocationComponent;
  let fixture: ComponentFixture<WidgetVendorLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetVendorLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetVendorLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
