import { TestBed } from '@angular/core/testing';

import { WidgetApproachingProjectsService } from './widget-approaching-projects.service';

describe('WidgetApproachingProjectService', () => {
  let service: WidgetApproachingProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetApproachingProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
