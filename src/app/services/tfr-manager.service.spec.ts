import { TestBed } from '@angular/core/testing';

import { TfrManagerService } from './tfr-manager.service';

describe('TfrManagerService', () => {
  let service: TfrManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfrManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
