import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ChartsService } from './charts.service';

describe('ChartsService', () => {
  let service: ChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('true should be true',()=>{expect(true).toBe(true);});
});
