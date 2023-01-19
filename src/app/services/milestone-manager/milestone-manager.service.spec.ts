import { TestBed } from '@angular/core/testing';

import { MilestoneManagerService } from './milestone-manager.service';

describe('MilestoneManagerService', () => {
  let service: MilestoneManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
