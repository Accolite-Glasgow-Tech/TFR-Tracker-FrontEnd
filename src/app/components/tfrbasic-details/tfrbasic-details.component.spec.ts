import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TFRBasicDetailsComponent } from './tfrbasic-details.component';

describe('TFRBasicDetailsComponent', () => {
  let component: TFRBasicDetailsComponent;
  let fixture: ComponentFixture<TFRBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TFRBasicDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TFRBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
