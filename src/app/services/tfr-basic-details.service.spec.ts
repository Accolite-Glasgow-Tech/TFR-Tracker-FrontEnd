import { TestBed } from '@angular/core/testing';

import { TfrBasicDetailsService } from './tfr-basic-details.service';

describe('TfrBasicDetailsService', () => {
  let service: TfrBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfrBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
