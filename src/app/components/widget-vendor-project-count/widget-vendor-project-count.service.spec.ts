import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WidgetVendorProjectCountService } from './widget-vendor-project-count.service';

describe('WidgetVendorProjectCountService', () => {
  let service: WidgetVendorProjectCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(WidgetVendorProjectCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
