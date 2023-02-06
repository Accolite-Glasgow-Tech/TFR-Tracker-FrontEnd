import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { DateFormatterService } from './date-formatter.service';

describe('DateFormatterService', () => {
  let service: DateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
    service = TestBed.inject(DateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
