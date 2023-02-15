import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DummyProject } from 'src/app/types/dummy-data';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;
  let testMilestone = DummyProject.milestones[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    component.value = testMilestone;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
