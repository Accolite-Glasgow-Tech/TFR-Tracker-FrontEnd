import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { MilestonesComponent } from './milestones.component';
import { MilestoneManagerService } from 'src/app/services/milestone-manager/milestone-manager.service';
import { TfrManagementService } from 'src/app/services/tfr-management/tfr-management.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

describe('MilestonesComponent', () => {
  let component: MilestonesComponent;
  let fixture: ComponentFixture<MilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilestonesComponent],
      providers: [
        {
          provide: MilestoneManagerService,
          useValue: jasmine.createSpyObj([''])
        },
        {
          provide: TfrManagementService,
          useValue: jasmine.createSpyObj([''])
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj([''])
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
