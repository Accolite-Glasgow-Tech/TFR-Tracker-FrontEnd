import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {
  let service: LoginGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LoginGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
