import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';

import { ApiService } from 'src/app/services/api/api.service';
import { TfrBasicDetailsComponent } from './tfr-basic-details.component';

describe('TFRBasicDetailsComponent', () => {
  let component: TfrBasicDetailsComponent;
  let fixture: ComponentFixture<TfrBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrBasicDetailsComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
