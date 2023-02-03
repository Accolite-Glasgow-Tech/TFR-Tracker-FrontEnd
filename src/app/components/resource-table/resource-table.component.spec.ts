import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';
import { DummyAllocatedResources } from 'src/app/types/dummy-data';

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
    let dummyAllocatedResource: AllocatedResourceTypeDTO =
      DummyAllocatedResources[0];

    component.removeResource(dummyAllocatedResource);

    expect(component.removeResourceEmitter.emit).toHaveBeenCalledWith(
      dummyAllocatedResource
    );
  });
});
