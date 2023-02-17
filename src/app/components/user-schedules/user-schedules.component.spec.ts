import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

import { UserSchedulesComponent } from './user-schedules.component';

describe('UserSchedulesComponent', () => {
  let component: UserSchedulesComponent;
  let fixture: ComponentFixture<UserSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [UserSchedulesComponent],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', {
            getUserTasks: of({}),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
