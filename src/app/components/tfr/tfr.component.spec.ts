import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfrComponent } from './tfr.component';

describe('TfrComponent', () => {
  let component: TfrComponent;
  let fixture: ComponentFixture<TfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
