import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyProjectResources,
} from 'src/app/types/dummy-data';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let service: ResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return resources that have not been deleted - with result list', () => {
    let dummyAllocatedResources: AllocatedResourceTypeDTO[] =
      DummyAllocatedResources;
    dummyAllocatedResources[0].is_deleted = true;
    expect(dummyAllocatedResources[0].is_deleted).toBe(true);
    expect(dummyAllocatedResources[1].is_deleted).toBe(false);

    let expectedResult = [dummyAllocatedResources[1]];

    let result = service.resourcesWithoutDeleted(dummyAllocatedResources);

    expect(result).toEqual(expectedResult);
  });

  it('should return resources that have not been deleted - with return empty list', () => {
    let dummyAllocatedResources: AllocatedResourceTypeDTO[] =
      DummyAllocatedResources;
    dummyAllocatedResources[0].is_deleted = true;
    dummyAllocatedResources[1].is_deleted = true;

    let result = service.resourcesWithoutDeleted(dummyAllocatedResources);

    expect(result).toEqual([]);
  });

  it('should return resources that have not been deleted with method argument undefined', () => {
    let result = service.resourcesWithoutDeleted(undefined);

    expect(result).toEqual([]);
  });

  it('should return list of project resources that are not deleted - with empty list', () => {
    expect(service.projectResourcesWithoutDeleted([])).toEqual([]);
  });

  it('should return list of project resources that are not deleted', () => {
    let dummyProjectResources = [...DummyProjectResources];
    dummyProjectResources[0].is_deleted = true;
    let expectedResult = [dummyProjectResources[1]];
    expect(
      service.projectResourcesWithoutDeleted(dummyProjectResources)
    ).toEqual(expectedResult);
  });
});
