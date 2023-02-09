import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WidgetClientLocationService } from './widget-client-location.service';

describe('WidgetClientLocationService', () => {
  let service: WidgetClientLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WidgetClientLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
