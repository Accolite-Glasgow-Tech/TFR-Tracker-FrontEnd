import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ResourceService } from './resource.service';
import { ResourceListType } from 'src/app/types/types';

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

  it('should retrieve roles from API via GET', () => {
    const dummyRoles: string[] = [
      'SCRUM_MASTER',
      'SOFTWARE_DEVELOPER',
      'PROJECT_LEAD',
    ];
    service.getAllRoles().subscribe((roles) => {
      expect(roles.length).toBe(3);
      expect(roles).toEqual(dummyRoles);
    });

    const request = httpMock.expectOne(service.rolesURL);
    expect(request.request.method).toBe('GET');
    request.flush(dummyRoles);
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

    const request = httpMock.expectOne(service.detailedResourceListURL);
    expect(request.request.method).toBe('GET');
    request.flush(dummyResources);
  });

  it('should remove _ from each role in roles array', () => {
    const dummyRolesToBeDisplayed: string[] = [
      'SCRUM MASTER',
      'SOFTWARE DEVELOPER',
      'UX UI DEVELOPER',
    ];

    const roles: string[] = [
      'SCRUM_MASTER',
      'SOFTWARE_DEVELOPER',
      'UX_UI_DEVELOPER',
    ];

    const returnedRoleList: string[] = service.convertRoleEnum(roles);

    expect(returnedRoleList).toEqual(dummyRolesToBeDisplayed);
  });

  it('should get the associated role from Roles HashMap', () => {
    const dummyRole = 'SCRUM_MASTER';
    const role = 'SCRUM MASTER';

    service.roleHashMap = new Map([['SCRUM_MASTER', 'SCRUM MASTER']]);

    const returnedRole: string = service.getAssociatedEnumRole(role);

    expect(returnedRole).toEqual(dummyRole);
  });

  it('should return empty string if role not found in Roles HashMap', () => {
    const role = 'JUNIOR DEVELOPER';

    service.roleHashMap = new Map([['SCRUM_MASTER', 'SCRUM MASTER']]);

    const returnedRole: string = service.getAssociatedEnumRole(role);

    expect(returnedRole).toEqual('');
  });

  it('should return role to be displayed', () => {
    const role = 'SCRUM_MASTER';
    const dummyRole = 'SCRUM MASTER';

    service.roleHashMap = new Map([['SCRUM_MASTER', 'SCRUM MASTER']]);

    const returnedRole: string = service.getAssociatedCleanRole(role);

    expect(returnedRole).toEqual(dummyRole);
  });
});
