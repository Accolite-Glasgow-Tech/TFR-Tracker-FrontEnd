import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let chartService: ApiService;
  let chartServiceSpy: { ChartsComponent: jasmine.Spy };

  beforeEach(async () => {
    chartServiceSpy = jasmine.createSpyObj([ApiService, ['ChartsComponent']]);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChartsComponent],
      providers: [
        { provide: ApiService, uservalue: chartServiceSpy },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
