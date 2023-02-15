import { TestBed } from '@angular/core/testing';

import { WriteGuard } from './write.guard';

describe('WriteGuard', () => {
  let guard: WriteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WriteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
