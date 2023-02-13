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

  it('test if getApproachingProjectNames returns list of data', () => {
    const apiService = fixture.debugElement.injector.get(ApiService);
    fixture.detectChanges();
    expect(apiService.getApproachingProjectNames()).not.toBeNull();
  });

  it('test if ProjectDetails is not empty', () => {
    const test = component.ProjectDetails;
    fixture.detectChanges();
    expect(test).not.toBeNull();
  });
});
