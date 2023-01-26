import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

import { MilestonesComponent } from './milestones.component';

describe('MilestonesComponent', () => {
  let component: MilestonesComponent;
  let fixture: ComponentFixture<MilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule,MatDialogModule],
      declarations: [MilestonesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
