import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { Milestone } from 'src/app/shared/interfaces';

import { ProjectSummaryComponent } from './project-summary.component';

describe('ProjectSummaryComponent', () => {
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
        {
          provide: DateFormatterService,
          useValue: jasmine.createSpyObj('DateFormatterService', ['getShortDisplayDate']),
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return not deleted milestones success', () => {
    const dummyMilestones: Milestone[] = [
      {
        id: 3,
        project_id: 1,
        name: 'deployment',
        description: 'deployment description',
        start_date: new Date('2022-12-26T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: true,
      },
      {
        id: 2,
        project_id: 1,
        name: 'frontend',
        description: 'frontend description',
        start_date: new Date('2022-12-19T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
    ];
    const expectedResults: Milestone[] = [
      {
        id: 2,
        project_id: 1,
        name: 'frontend',
        description: 'frontend description',
        start_date: new Date('2022-12-19T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
    ];

    let results = component.milestonesWithoutDeleted(dummyMilestones);
    expect(results).toEqual(expectedResults);
  });

  it('should return not deleted milestones empty list', () => {
    let dummyMilestones!: Milestone[];

    let results = component.milestonesWithoutDeleted(dummyMilestones);
    expect(results).toEqual([]);
  });
});
