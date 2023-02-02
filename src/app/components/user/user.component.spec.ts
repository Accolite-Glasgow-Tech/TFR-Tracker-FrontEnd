import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { userService } from 'src/app/services/user/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj([''])
        },
        {
          provide: userService,
          useValue: jasmine.createSpyObj([''])
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
