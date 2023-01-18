import { TestBed } from '@angular/core/testing';

import { WidgetApproachingProjectDeadlineService } from './widget-approaching-projects.service';

describe('WidgetApproachingProjectDeadlineService', () => {
  let service: WidgetApproachingProjectDeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetApproachingProjectDeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
