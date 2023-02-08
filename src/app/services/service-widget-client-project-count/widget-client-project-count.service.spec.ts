import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WidgetClientProjectCountService } from './widget-client-project-count.service';

describe('WidgetClientProjectCountService', () => {
  let service: WidgetClientProjectCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WidgetClientProjectCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
