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

  it('should emit a toggle', () => {
    let hasToggled = false;
    service.toggleEmitter.subscribe(() => (hasToggled = true));
    service.toggle();
    expect(hasToggled).toBeTruthy();
  });
});
