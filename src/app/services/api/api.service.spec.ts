import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj('SnackBarService', ['showSnackBar']),
        },
      ],
    });
    service = TestBed.inject(ApiService);
    snackBarServiceSpy = TestBed.inject(
      SnackBarService
    ) as jasmine.SpyObj<SnackBarService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
