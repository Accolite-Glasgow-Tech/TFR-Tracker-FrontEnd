import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

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
    let dummyAllocatedResource: AllocatedResourceTypeDTO = {
      project_id: 1,
      resource_id: 1,
      resource_name: 'John Bowers',
      resource_email: 'johnbowers@accolitedigital.com',
      seniority: 'SENIOR',
      is_deleted: false,
      role: 'SCRUM MASTER',
    };

    component.removeResource(dummyAllocatedResource);

    expect(component.removeResourceEmitter.emit).toHaveBeenCalledWith(
      dummyAllocatedResource
    );
  });
});
