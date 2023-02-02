import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetVendorProjectCountComponent } from './widget-vendor-project-count.component';
import { WidgetVendorProjectCountService } from './widget-vendor-project-count.service';
import { of } from 'rxjs';

describe('WidgetVendorProjectCountComponent', () => {
  let component: WidgetVendorProjectCountComponent;
  let fixture: ComponentFixture<WidgetVendorProjectCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetVendorProjectCountComponent ],
      providers: [
        {
          provide: WidgetVendorProjectCountService,
          useValue: jasmine.createSpyObj('WidgetVendorProjectCountService', {
            'readVendorProjectCountUrlUrl': of({})
          })
        }
      ]
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
