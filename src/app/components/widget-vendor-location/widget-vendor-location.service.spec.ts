import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WidgetVendorLocationService } from './widget-vendor-location.service';

describe('WidgetVendorLocationService', () => {
  let service: WidgetVendorLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WidgetVendorLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
