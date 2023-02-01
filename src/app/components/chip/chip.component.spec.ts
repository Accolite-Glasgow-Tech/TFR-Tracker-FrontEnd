import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;
  const testMilestone = {
    id: 1,
    project_id: 1,
    start_date: new Date('01/01/2024'),
    delivery_date: new Date('01/02/2024'),
    acceptance_date: new Date('01/02/2024'),
    is_deleted: false,
    name: 'test milestone name',
    description: 'test milestone description',
  };

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
