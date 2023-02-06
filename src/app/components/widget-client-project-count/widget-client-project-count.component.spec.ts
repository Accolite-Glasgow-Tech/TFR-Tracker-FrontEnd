import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetClientProjectCountComponent } from './widget-client-project-count.component';
import { WidgetClientProjectCountService } from './widget-client-project-count.service';
import { of } from 'rxjs';

describe('WidgetClientProjectCountComponent', () => {
  let component: WidgetClientProjectCountComponent;
  let fixture: ComponentFixture<WidgetClientProjectCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetClientProjectCountComponent ],
      providers: [
        {
          provide: WidgetClientProjectCountService,
          useValue: jasmine.createSpyObj('WidgetClientProjectCountService', {
            'readClientProjectCountUrlUrl': of({})
          })
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetClientProjectCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
