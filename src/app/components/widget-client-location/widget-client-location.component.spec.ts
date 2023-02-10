import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
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
          provide: ApiService,
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
