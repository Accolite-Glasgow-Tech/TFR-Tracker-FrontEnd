import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api/api.service';

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
      providers: [{ provide: ApiService, uservalue: chartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(ChartsComponent).toBeDefined();
  });
});
