import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { CreateGuard } from './create.guard';

describe('CreateGuard', () => {
  let guard: CreateGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
      ],
    });
    guard = TestBed.inject(CreateGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    sessionStorage.setItem('jwt_token', 'test_token');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('checkIfComponentCanBeActivated should return true if session storage role is any of the authorised roles', () => {
    sessionStorage.setItem('user_role', 'ROLE_PMO');

    expect(guard.checkIfComponentCanBeActivated()).toBeTruthy();

    sessionStorage.setItem('user_role', 'ROLE_MANAGER');

    expect(guard.checkIfComponentCanBeActivated()).toBeTruthy();
  });

  it('checkIfComponentCanBeActivated should return false if session storage role is not any of the authorised roles', () => {
    sessionStorage.setItem('user_role', 'ROLE_RESOURCE');

    expect(guard.checkIfComponentCanBeActivated()).toBeFalsy();

    sessionStorage.setItem('user_role', 'ROLE_ADMIN');

    expect(guard.checkIfComponentCanBeActivated()).toBeFalsy();

    sessionStorage.removeItem('user_role');

    expect(guard.checkIfComponentCanBeActivated()).toBeFalsy();
  });

  it('checkIfComponentCanBeActivated should return false if user logged is not logged in', () => {
    sessionStorage.setItem('user_role', 'ROLE_PMO');

    expect(guard.checkIfComponentCanBeActivated()).toBeTruthy();

    sessionStorage.removeItem('jwt_token');

    expect(guard.checkIfComponentCanBeActivated()).toBeFalsy();
  });

  it('canActivate should return false and redirect to home if check fails', () => {
    spyOn(guard, 'checkIfComponentCanBeActivated').and.returnValue(false);

    let result = guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(result).toBeFalsy();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/home');

    expect(guard.checkIfComponentCanBeActivated).toHaveBeenCalledTimes(1);
  });

  it('canActivate should return true if check succeeds', () => {
    spyOn(guard, 'checkIfComponentCanBeActivated').and.returnValue(true);

    let result = guard.canActivate(new ActivatedRouteSnapshot(), mockSnapshot);
    expect(result).toBeTruthy();

    expect(guard.checkIfComponentCanBeActivated).toHaveBeenCalledTimes(1);
  });
});
