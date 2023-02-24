import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGeneratorComponent } from './error-generator.component';

describe('ErrorGeneratorComponent', () => {
  let component: ErrorGeneratorComponent;
  let fixture: ComponentFixture<ErrorGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
