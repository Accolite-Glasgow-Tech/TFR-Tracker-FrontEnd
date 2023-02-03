import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateFormatterService } from 'src/app/services/date-formatter/date-formatter.service';
import { ResourceService } from 'src/app/services/resource/resource.service';

import { MilestoneTableComponent } from './milestone-table.component';

describe('MilestoneTableComponent', () => {
  let component: MilestoneTableComponent;
  let fixture: ComponentFixture<MilestoneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilestoneTableComponent],
      providers: [
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj(['']),
        },
        {
          provide: DateFormatterService,
          useValue: jasmine.createSpyObj(['']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MilestoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
