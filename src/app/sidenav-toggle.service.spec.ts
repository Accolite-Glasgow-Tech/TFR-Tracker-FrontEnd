import { TestBed } from '@angular/core/testing';

import { SidenavToggleService } from './sidenav-toggle.service';

describe('SidenavToggleService', () => {
  let service: SidenavToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
