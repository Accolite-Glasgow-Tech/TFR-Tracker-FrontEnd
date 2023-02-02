import { TestBed } from '@angular/core/testing';
import { MilestoneManagerService } from './milestone-manager.service';
import { FormMilestone, Milestone } from 'src/app/shared/interfaces';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { DummyProject } from 'src/app/types/dummy-data';

describe('MilestoneManagerService', () => {
  let service: MilestoneManagerService;
  let unsaveableMilestone: FormMilestone;
  let deletedMilestone: Milestone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneManagerService);
    const dummyProject = DummyProject;
    service.setMilestones(DummyProject.milestones);
    unsaveableMilestone = {
      id: 1,
      project_id: 1,
      name: 'unsaveable',
      description: '',
      is_deleted: false,
    };
    deletedMilestone = {
      id: -2,
      project_id: 1,
      name: 'deleted',
      description: 'this milestone is deleted',
      is_deleted: true,
      start_date: new Date(),
      delivery_date: new Date(),
      acceptance_date: new Date(),
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully determine saveability', () => {
    expect(service.isSaveable(DummyProject.milestones[0])).toBeTruthy();
    expect(service.isSaveable(unsaveableMilestone)).toBeFalsy();
  });

  it('should generate temporary ids correctly', () => {
    expect(service.generateIdOfNew()).toEqual(-1);
    service.setMilestones([deletedMilestone, ...DummyProject.milestones]);
    expect(service.generateIdOfNew()).toEqual(-3);
    service.setMilestones([]);
    expect(service.generateIdOfNew()).toEqual(-1);
  });
});
