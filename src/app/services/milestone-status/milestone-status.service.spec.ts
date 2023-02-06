import { TestBed } from '@angular/core/testing';

import { MilestoneStatusService } from './milestone-status.service';

describe('MilestoneStatusService', () => {
  let service: MilestoneStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilestoneStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
