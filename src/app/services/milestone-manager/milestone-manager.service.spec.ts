import { TestBed } from '@angular/core/testing';
import { MilestoneManagerService } from './milestone-manager.service';
import { FormMilestone } from 'src/app/shared/interfaces';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';

describe('MilestoneManagerService', () => {
  let service: MilestoneManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should successfully determine saveability', () => {
    let saveableMilestone: FormMilestone = {
      id: 1,
      name: 'saveable',
      project_id: 1,
      description: '',
      start_date: new Date(),
      delivery_date: new Date(),
      acceptance_date: new Date(),
      is_deleted: false,
    };
    let unsaveableMilestone: FormMilestone = {
      id: 1,
      project_id: 1,
      name: 'unsaveable',
      description: '',
      is_deleted: false,
    };
    expect(service.isSaveable(saveableMilestone)).toBeTruthy();
    expect(service.isSaveable(unsaveableMilestone)).toBeFalsy();
  });
});
