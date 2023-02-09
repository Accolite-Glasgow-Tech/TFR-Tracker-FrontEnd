import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WidgetClientProjectCountService } from 'src/app/services/service-widget-client-project-count/widget-client-project-count.service';
import { WidgetClientProjectCountComponent } from './widget-client-project-count.component';

describe('WidgetClientProjectCountComponent', () => {
  let component: WidgetClientProjectCountComponent;
  let fixture: ComponentFixture<WidgetClientProjectCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetClientProjectCountComponent],
      providers: [
        {
          provide: WidgetClientProjectCountService,
          useValue: jasmine.createSpyObj('WidgetClientProjectCountService', {
            readClientProjectCountUrlUrl: of({}),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetClientProjectCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
