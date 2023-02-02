import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  seniorityLevelsURL,
  TFRCreationResourceURL,
} from 'src/app/shared/constants';
import {
  AllocatedResourceTypeDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';
import { ResourceService } from './resource.service';

describe('ResourceService', () => {
  let service: ResourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ResourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all seniority levels from API via GET', () => {
    const dummySeniorityLevels: string[] = [
      'ADVANCED',
      'SENIOR',
      'INTERMEDIATE',
      'JUNIOR',
    ];

    service.getAllSeniorityLevels().subscribe((seniorityLevels) => {
      expect(seniorityLevels.length).toBe(4);
      expect(seniorityLevels).toEqual(dummySeniorityLevels);
    });

    const request = httpMock.expectOne(seniorityLevelsURL);
    expect(request.request.method).toBe('GET');
    request.flush(dummySeniorityLevels);
  });

  it('should retrieve resources from API via GET', () => {
    const dummyResources: ResourceListType[] = [
      {
        resource_id: 1,
        resource_name: 'John Bowers',
        resource_email: 'johnbowers@accolitedigital.com',
        selected: false,
      },
      {
        resource_id: 2,
        resource_name: 'Heather Reed',
        resource_email: 'heatherreed@accolitedigital.com',
        selected: false,
      },
    ];

    service.getAllResources().subscribe((resources) => {
      expect(resources.length).toBe(2);
      expect(resources).toEqual(dummyResources);
    });

    const request = httpMock.expectOne(TFRCreationResourceURL);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResources);
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
