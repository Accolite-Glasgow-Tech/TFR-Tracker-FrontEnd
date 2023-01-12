import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneTableComponent } from './milestone-table.component';

describe('MilestoneTableComponent', () => {
  let component: MilestoneTableComponent;
  let fixture: ComponentFixture<MilestoneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
