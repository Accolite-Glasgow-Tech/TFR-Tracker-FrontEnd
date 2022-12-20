import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfrsComponent } from './tfrs.component';

describe('TfrsComponent', () => {
  let component: TfrsComponent;
  let fixture: ComponentFixture<TfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
