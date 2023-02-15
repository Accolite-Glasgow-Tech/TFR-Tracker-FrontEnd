import { TestBed } from '@angular/core/testing';
import { LoginGuardService } from '../guards/login-guard/login-guard.service';
import { LogoutGuardService } from '../guards/logout-guard/logout-guard.service';

import { RouteGuardManagerService } from './route-guard-manager.service';

describe('RouteGuardManagerService', () => {
  let service: RouteGuardManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoginGuardService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: LogoutGuardService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    });
    service = TestBed.inject(RouteGuardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
