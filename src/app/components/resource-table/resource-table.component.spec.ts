import { ComponentFixture, TestBed } from '@angular/core/testing';
import { emit } from 'process';

import { ResourceTableComponent } from './resource-table.component';

describe('ResourceTableComponent', () => {
  let component: ResourceTableComponent;
  let fixture: ComponentFixture<ResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a resource and emit a resource removed event', () => {
    spyOn(component.removeResourceEmitter, 'emit');

    component.removeResource(1);

    expect(component.removeResourceEmitter.emit).toHaveBeenCalledWith(1);
  });
});
