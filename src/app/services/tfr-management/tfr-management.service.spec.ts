import { TestBed } from '@angular/core/testing';

import { TfrManagementService } from './tfr-management.service';

describe('TfrManagementService', () => {
  let service: TfrManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfrManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
