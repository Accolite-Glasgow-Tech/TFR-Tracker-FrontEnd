import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyPickerComponent } from './frequency-picker.component';

describe('FrequencyPickerComponent', () => {
  let component: FrequencyPickerComponent;
  let fixture: ComponentFixture<FrequencyPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
