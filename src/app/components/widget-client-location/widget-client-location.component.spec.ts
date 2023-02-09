import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetClientLocationService } from 'src/app/services/service-widget-client-location/widget-client-location.service';
import { WidgetClientLocationComponent } from './widget-client-location.component';

describe('WidgetClientLocationComponent', () => {
  let component: WidgetClientLocationComponent;
  let fixture: ComponentFixture<WidgetClientLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetClientLocationComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: WidgetClientLocationService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetClientLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
