import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceService } from 'src/app/services/resource/resource.service';

import { ProjectSummaryComponent } from './project-summary.component';

fdescribe('ProjectSummaryComponent', () => {
  let component: ProjectSummaryComponent;
  let fixture: ComponentFixture<ProjectSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSummaryComponent],
      providers: [
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
