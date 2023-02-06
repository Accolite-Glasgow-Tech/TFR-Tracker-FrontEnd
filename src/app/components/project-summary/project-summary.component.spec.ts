import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';
import { AllocatedResourceTypeDTO, Milestone } from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyProject,
} from 'src/app/types/dummy-data';
import { ProjectSummaryComponent } from './project-summary.component';

describe('ProjectSummaryComponent', () => {
  let component: ProjectSummaryComponent;
  let fixture: ComponentFixture<ProjectSummaryComponent>;
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let dummyAllocatedResource: AllocatedResourceTypeDTO[] =
    DummyAllocatedResources;

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
        {
          provide: DateFormatterService,
          useValue: jasmine.createSpyObj('DateFormatterService', [
            'getShortDisplayDate',
          ]),
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
    const expectedResults: Milestone[] = [
      DummyProject.milestones[1],
      DummyProject.milestones[2],
    ];

    let results = component.milestonesWithoutDeleted(DummyProject.milestones);
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
