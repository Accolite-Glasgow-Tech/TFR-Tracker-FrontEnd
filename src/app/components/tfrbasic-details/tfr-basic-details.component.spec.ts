import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfrBasicDetailsComponent } from './tfr-basic-details.component';

describe('TFRBasicDetailsComponent', () => {
  let component: TfrBasicDetailsComponent;
  let fixture: ComponentFixture<TfrBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TfrBasicDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TfrBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
