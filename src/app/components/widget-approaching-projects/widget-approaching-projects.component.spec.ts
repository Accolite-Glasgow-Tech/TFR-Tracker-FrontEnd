import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WidgetApproachingProjectsComponent } from './widget-approaching-projects.component';
import { WidgetApproachingProjectsService } from './widget-approaching-projects.service';

describe('WidgetApproachingProjectsComponent', () => {
  let component: WidgetApproachingProjectsComponent;
  let fixture: ComponentFixture<WidgetApproachingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetApproachingProjectsComponent],
      providers: [
        {
          provide: WidgetApproachingProjectsService,
          useValue: jasmine.createSpyObj('WidgetApproachingProjectsService', {
            'readApproachingProjectNamesData': of([]),
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetApproachingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
