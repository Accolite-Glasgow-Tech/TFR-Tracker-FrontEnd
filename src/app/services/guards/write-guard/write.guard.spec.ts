import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  convertToParamMap,
  Params,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { ApiService } from '../../api/api.service';

import { WriteGuard } from './write.guard';

fdescribe('WriteGuard', () => {
  let guard: WriteGuard;
  let params: Params = {
    id: '1',
  };
  let mockSnapshot: any = jasmine.createSpyObj<RouterStateSnapshot>(
    'RouterStateSnapshot',
    ['toString']
  );
  let mockRoute: any = jasmine.createSpyObj<ActivatedRouteSnapshot>(
    'ActivatedRouteSnapshot',
    [],
    {
      paramMap: convertToParamMap(params),
    }
  );
  let routerSpy: jasmine.SpyObj<Router>;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getHasWritePermission',
          ]),
        },
      ],
    });
    guard = TestBed.inject(WriteGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    apiSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if check succeeds', () => {
    spyOn(guard, 'checkIfComponentCanBeActivated').and.returnValue(of(true));

    const result = guard.canActivate(mockRoute, mockSnapshot);

    expect(result).toBeTruthy();
    expect(guard.checkIfComponentCanBeActivated).toHaveBeenCalledOnceWith('1');
  });

  it('should call api with correct project id', () => {});
});
