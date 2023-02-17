import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSchedulesComponent } from './project-schedules.component';

describe('ProjectSchedulesComponent', () => {
  let component: ProjectSchedulesComponent;
  let fixture: ComponentFixture<ProjectSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
