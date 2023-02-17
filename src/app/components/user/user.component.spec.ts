import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { ResponseHandlerService } from 'src/app/services/response-handler/response-handler.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { userService } from 'src/app/services/user/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: userService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
