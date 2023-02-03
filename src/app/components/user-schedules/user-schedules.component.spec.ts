import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { of } from 'rxjs';

import { UserSchedulesComponent } from './user-schedules.component';

describe('UserSchedulesComponent', () => {
  let component: UserSchedulesComponent;
  let fixture: ComponentFixture<UserSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSchedulesComponent ],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', {
            'getUserTasksById': of({})
        })
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
