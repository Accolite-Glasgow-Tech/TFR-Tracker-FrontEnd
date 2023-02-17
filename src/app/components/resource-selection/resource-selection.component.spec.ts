import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSelectionComponent } from './resource-selection.component';

describe('ResourceSelectionComponent', () => {
  let component: ResourceSelectionComponent;
  let fixture: ComponentFixture<ResourceSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
