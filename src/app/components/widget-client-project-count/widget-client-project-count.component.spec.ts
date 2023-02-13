import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { WidgetClientProjectCountComponent } from './widget-client-project-count.component';

describe('WidgetClientProjectCountComponent', () => {
  let component: WidgetClientProjectCountComponent;
  let fixture: ComponentFixture<WidgetClientProjectCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetClientProjectCountComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetClientProjectCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
