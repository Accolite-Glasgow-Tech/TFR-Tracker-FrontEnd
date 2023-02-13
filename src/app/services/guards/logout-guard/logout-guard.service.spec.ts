import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { userService } from '../../user/user.service';

import { LogoutGuardService } from './logout-guard.service';

describe('LogoutGuardService', () => {
  let service: LogoutGuardService;
  let userServiceSpy: jasmine.SpyObj<userService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
        {
          provide: userService,
          useValue: jasmine.createSpyObj('userService', ['isLoggedIn']),
        },
      ],
    });
    service = TestBed.inject(LogoutGuardService);
    userServiceSpy = TestBed.inject(userService) as jasmine.SpyObj<userService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //=======================================

  it('canActivate should call checkIfComponentCanBeActivated', () => {
    const DummyCanActivate = true;
    spyOn(service, 'checkIfComponentCanBeActivated').and.returnValue(
      DummyCanActivate
    );

    let result = service.canActivate();

    expect(service.checkIfComponentCanBeActivated).toHaveBeenCalledTimes(1);
    expect(result).toEqual(DummyCanActivate);
  });

  it('canActivate should call navigateToValid if check returns false', () => {
    const DummyCanActivate = false;
    spyOn(service, 'checkIfComponentCanBeActivated').and.returnValue(
      DummyCanActivate
    );
    spyOn(service, 'navigateToValid').and.stub();

    let result = service.canActivate();

    expect(result).toEqual(DummyCanActivate);
  });

  it('navigateToValid should navigate to home if user is logged in', () => {
    userServiceSpy.isLoggedIn.and.returnValue(true);

    service.navigateToValid();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('home');
  });

  it('navigateToValid should navigate to login if user is not logged in', () => {
    userServiceSpy.isLoggedIn.and.returnValue(false);

    service.navigateToValid();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('login');
  });

  it('checkIfComponentCanActivate should return false if user logged in and guarding not disabled', () => {
    let originalValue = environment.routeGuardingDisabled;
    environment.routeGuardingDisabled = false;
    userServiceSpy.isLoggedIn.and.returnValue(true);

    let result = service.checkIfComponentCanBeActivated();

    expect(userServiceSpy.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(false);

    environment.routeGuardingDisabled = originalValue;
  });

  it('checkIfComponentCanActivate should return true if user not logged in and guarding is disabled', () => {
    let originalValue = environment.routeGuardingDisabled;
    environment.routeGuardingDisabled = true;
    userServiceSpy.isLoggedIn.and.returnValue(false);

    let result = service.checkIfComponentCanBeActivated();

    expect(userServiceSpy.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);

    environment.routeGuardingDisabled = originalValue;
  });

  it('checkIfComponentCanActivate should return true if user is not logged in and guarding is not disabled', () => {
    let originalValue = environment.routeGuardingDisabled;
    environment.routeGuardingDisabled = false;
    userServiceSpy.isLoggedIn.and.returnValue(false);

    let result = service.checkIfComponentCanBeActivated();

    expect(userServiceSpy.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toEqual(true);

    environment.routeGuardingDisabled = originalValue;
  });
});
