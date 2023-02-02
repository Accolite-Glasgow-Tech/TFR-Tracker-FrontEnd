import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { TfrManagementService } from './tfr-management.service';

describe('TfrManagementService', () => {
  let service: TfrManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule, MatDialogModule ],
    });
    service = TestBed.inject(TfrManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
