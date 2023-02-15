import { TestBed } from '@angular/core/testing';
import { CreateGuard } from '../guards/create-guard/create.guard';
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
          useValue: jasmine.createSpyObj('LoginGuardService', [
            'checkIfComponentCanBeActivated',
          ]),
        },
        {
          provide: LogoutGuardService,
          useValue: jasmine.createSpyObj('LogoutGuardService', [
            'checkIfComponentCanBeActivated',
          ]),
        },
        {
          provide: CreateGuard,
          useValue: jasmine.createSpyObj('CreateGuard', [
            'checkIfComponentCanBeActivated',
          ]),
        },
      ],
    });
    service = TestBed.inject(RouteGuardManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
