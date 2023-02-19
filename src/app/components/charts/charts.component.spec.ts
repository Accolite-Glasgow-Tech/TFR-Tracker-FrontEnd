import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api/api.service';
import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      declarations: [ChartsComponent],
      providers: [
        {
          provide: ApiService,
          usevalue: jasmine.createSpyObj('ApiService', ['getTFRStatusCount']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('is server up', () => {
    expect(component.serverup).toBe(false);
  });

  it('testing html element', () => {
    const data = fixture.nativeElement;
    expect(data.querySelector('.head').textContent).toContain(
      'Service unavailable. Try again'
    );
  });

  it('testing server is up', () => {
    const element: HTMLDivElement =
      fixture.debugElement.nativeElement.querySelector('#mat1');
    expect(element).not.toBeNull();
  });
});
