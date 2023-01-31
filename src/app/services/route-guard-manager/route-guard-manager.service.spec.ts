import { TestBed } from '@angular/core/testing';

import { RouteGuardManagerService } from './route-guard-manager.service';

describe('RouteGuardManagerService', () => {
  let service: RouteGuardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteGuardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
