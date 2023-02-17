import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
      declarations: [ReportsComponent, FrequencyPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
