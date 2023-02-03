import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';
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
    let dummyAllocatedResources: AllocatedResourceTypeDTO[] = [
      {
        project_id: 1,
        resource_id: 1,
        resource_name: 'John Makan',
        resource_email: 'johnmakan@accolitedigital.com',
        seniority: 'JUNIOR',
        is_deleted: true,
        role: 'SCRUM MASTER',
      },
      {
        project_id: 1,
        resource_id: 3,
        resource_name: 'Kimberly Gould',
        resource_email: 'kimberlygould@accolitedigital.com',
        seniority: 'JUNIOR',
        is_deleted: false,
        role: 'SOFTWARE DEVELOPER',
      },
    ];

    let expectedResult = [dummyAllocatedResources[1]];

    let result = service.resourcesWithoutDeleted(dummyAllocatedResources);

    expect(result).toEqual(expectedResult);
  });

  it('should return resources that have not been deleted - with return empty list', () => {
    let dummyAllocatedResources: AllocatedResourceTypeDTO[] = [
      {
        project_id: 1,
        resource_id: 1,
        resource_name: 'John Makan',
        resource_email: 'johnmakan@accolitedigital.com',
        seniority: 'JUNIOR',
        is_deleted: true,
        role: 'SCRUM MASTER',
      },
      {
        project_id: 1,
        resource_id: 3,
        resource_name: 'Kimberly Gould',
        resource_email: 'kimberlygould@accolitedigital.com',
        seniority: 'JUNIOR',
        is_deleted: true,
        role: 'SOFTWARE DEVELOPER',
      },
    ];

    let result = service.resourcesWithoutDeleted(dummyAllocatedResources);

    expect(result).toEqual([]);
  });

  it('should return resources that have not been deleted with method argument undefined', () => {
    let result = service.resourcesWithoutDeleted(undefined);

    expect(result).toEqual([]);
  });
});
