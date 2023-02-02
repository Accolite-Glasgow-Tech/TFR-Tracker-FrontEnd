import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetVendorLocationComponent } from './widget-vendor-location.component';
import { WidgetVendorLocationService } from './widget-vendor-location.service';

describe('WidgetVendorLocationComponent', () => {
  let component: WidgetVendorLocationComponent;
  let fixture: ComponentFixture<WidgetVendorLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetVendorLocationComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: WidgetVendorLocationService,
          useValue: jasmine.createSpyObj([''])
        }
      ]
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
