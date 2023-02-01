import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AllocatedResourceTypeDTO, Milestone } from 'src/app/shared/interfaces';

import { ProjectSummaryComponent } from './project-summary.component';

describe('ProjectSummaryComponent', () => {
  let component: ProjectSummaryComponent;
  let fixture: ComponentFixture<ProjectSummaryComponent>;
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let dummyAllocatedResource: AllocatedResourceTypeDTO[] = [
    {
      project_id: 1,
      resource_id: 1,
      resource_name: 'John Bowers',
      resource_email: 'johnbowers@accolitedigital.com',
      seniority: 'SENIOR',
      is_deleted: false,
      role: 'SCRUM MASTER',
    },
    {
      project_id: 1,
      resource_id: 3,
      resource_name: 'Kimberly Gould',
      resource_email: 'kimberlygould@accolitedigital.com',
      seniority: 'JUNIOR',
      is_deleted: false,
      role: 'SOFTWARE DEVELOPER',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectSummaryComponent],
      providers: [
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['resourcesWithoutDeleted']),
        },
        {
          provide: DateFormatterService,
          useValue: jasmine.createSpyObj(['getShortDisplayDate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectSummaryComponent);
    resourceServiceSpy = TestBed.inject(
      ResourceService
    ) as jasmine.SpyObj<ResourceService>;
    resourceServiceSpy.resourcesWithoutDeleted.and.returnValue(
      dummyAllocatedResource
    );

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
        description: 'deployment',
        start_date: new Date('2022-12-26T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: true,
      },
      {
        id: 2,
        project_id: 1,
        description: 'frontend',
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
        description: 'frontend',
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

  it('should return allocated resources without delete', () => {
    expect(component.currentResourcesWithNames).toEqual(dummyAllocatedResource);
  });
});
