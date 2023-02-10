import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { tfrService } from 'src/app/services/tfrs/tfr.service';

import { TfrsComponent } from './tfrs.component';

describe('TfrsComponent', () => {
  let component: TfrsComponent;
  let fixture: ComponentFixture<TfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        DatePipe,
        {
          provide: tfrService,
          useValue: jasmine.createSpyObj('tfrService', {
            getAllProjects: of([]),
            getAllClients: of([]),
          }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
