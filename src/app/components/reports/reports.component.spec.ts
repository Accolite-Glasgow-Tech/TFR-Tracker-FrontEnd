import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReportsComponent } from './reports.component';
import { FrequencyPickerComponent } from '../frequency-picker/frequency-picker.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api/api.service';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj([''])
        }
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
