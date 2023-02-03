import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetClientLocationComponent } from './widget-client-location.component';
import { WidgetClientLocationService } from './widget-client-location.service';

describe('WidgetClientLocationComponent', () => {
  let component: WidgetClientLocationComponent;
  let fixture: ComponentFixture<WidgetClientLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetClientLocationComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: WidgetClientLocationService,
          useValue: jasmine.createSpyObj([''])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetClientLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
