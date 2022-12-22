import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfrCreationResourceComponent } from './tfr-creation-resource.component';

describe('TfrCreationResourceComponent', () => {
  let component: TfrCreationResourceComponent;
  let fixture: ComponentFixture<TfrCreationResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TfrCreationResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TfrCreationResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
