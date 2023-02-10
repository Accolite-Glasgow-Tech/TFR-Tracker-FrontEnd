import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { WidgetApproachingProjectsComponent } from './widget-approaching-projects.component';

describe('WidgetApproachingProjectsComponent', () => {
  let component: WidgetApproachingProjectsComponent;
  let fixture: ComponentFixture<WidgetApproachingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetApproachingProjectsComponent],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', {
            getApproachingProjectNames: of([]),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetApproachingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
