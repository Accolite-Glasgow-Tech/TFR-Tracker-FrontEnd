import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  AllocatedResourceType,
  Milestone,
  Project,
  ProjectBasicDetails,
  ProjectResource,
  Vendor,
} from 'src/app/types/types';
import { ApiService } from '../api.service';
import { ResourceService } from '../resource/resource.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';

import { TfrManagementService } from './tfr-management.service';

describe('TfrManagementService', () => {
  let service: TfrManagementService;
  let httpMock: HttpTestingController;
  let resourceServiceSpy: jasmine.SpyObj<ResourceService>;
  let snackBarServiceSpy: jasmine.SpyObj<SnackBarService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let milestones: Milestone[];
  let projectResources: ProjectResource[];
  let projectResourcesWithNames: AllocatedResourceType[];
  let project: Project;
  let vendorName: string;
  let basicDetails: ProjectBasicDetails;
  let vendors: Vendor[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ResourceService,
          useValue: jasmine.createSpyObj('ResourceService', [
            'getAssociatedEnumRole',
          ]),
        },
        {
          provide: SnackBarService,
          useValue: jasmine.createSpyObj('SnackBarService', ['showSnackBar']),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', ['getVendorData']),
        },
      ],
    });

    resourceServiceSpy = TestBed.inject(
      ResourceService
    ) as jasmine.SpyObj<ResourceService>;
    snackBarServiceSpy = TestBed.inject(
      SnackBarService
    ) as jasmine.SpyObj<SnackBarService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TfrManagementService);

    milestones = [
      {
        id: 3,
        project_id: 1,
        description: 'deployment',
        start_date: new Date('2022-12-26T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: true,
      },
      {
        id: 2,
        project_id: 1,
        description: 'frontend',
        start_date: new Date('2022-12-19T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
      {
        id: 1,
        project_id: 1,
        description: 'backend',
        start_date: new Date('2022-12-12T09:00:00.000+00:00'),
        delivery_date: new Date('2022-12-16T23:59:59.000+00:00'),
        acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
        is_deleted: false,
      },
    ];

    projectResources = [
      {
        project_id: 1,
        resource_id: 3,
        role: 'SOFTWARE_DEVELOPER',
      },
      {
        project_id: 1,
        resource_id: 1,
        role: 'SCRUM_MASTER',
      },
    ];

    project = {
      id: 1,
      name: 'Bench Project',
      vendor_id: 2,
      start_date: new Date('2022-12-12T09:00:00.000+00:00'),
      end_date: new Date('2022-12-31T23:59:59.000+00:00'),
      status: 'INPROGRESS',
      version: 1,
      vendor_specific: {
        Department: 'Finance',
        'ED/MD': 'Julia Lee',
      },
      milestones: milestones,
      is_deleted: false,
      created_by: 1,
      modified_by: 2,
      created_at: new Date('2022-12-01T08:00:00.000+00:00'),
      modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
      project_resources: projectResources,
    };

    basicDetails = {
      name: 'Bench Project',
      start_date: new Date('2022-12-12T09:00:00.000+00:00'),
      end_date: new Date('2022-12-31T23:59:59.000+00:00'),
      status: 'INPROGRESS',
      vendor_id: 2,
      vendor_specific: {
        Department: 'Finance',
        'ED/MD': 'Julia Lee',
      },
    };

    vendors = [
      {
        id: 1,
        name: 'JP Morgan',
      },
      {
        id: 2,
        name: 'Morgan Stanley',
      },
      {
        id: 3,
        name: 'HSBC',
      },
      {
        id: 4,
        name: 'BOA',
      },
      {
        id: 5,
        name: 'Santander',
      },
    ];

    service.project = project;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Project ID', () => {
    expect(service.getProjectId).toBe(1);
  });

  it('should get Project Name', () => {
    expect(service.getProjectName).toBe('Bench Project');
  });

  it('should get Milestones', () => {
    expect(service.getMilestones).toBe(milestones);
  });

  it('should get Project Resources with names', () => {
    projectResourcesWithNames = [
      {
        project_id: 1,
        resource_id: 1,
        resource_name: 'John Bowers',
        resource_email: 'johnbowers@accolitedigital.com',
        role: 'SCRUM_MASTER',
      },
      {
        project_id: 1,
        resource_id: 3,
        resource_name: 'Kimberly Gould',
        resource_email: 'kimberlygould@accolitedigital.com',
        role: 'SOFTWARE_DEVELOPER',
      },
    ];

    service.projectResourcesWithNames = projectResourcesWithNames;

    expect(service.getProjectResourcesWithNames).toBe(
      projectResourcesWithNames
    );
  });

  it('should get the Project Resources', () => {
    expect(service.getProjectResources).toBe(projectResources);
  });

  it('should get Project', () => {
    expect(service.getProject).toBe(project);
  });

  it('should get Vendor Name', () => {
    vendorName = 'Morgan Stanley';
    service.vendorName = vendorName;
    expect(service.getVendorName).toBe(vendorName);
  });

  it('should set Project', () => {
    service.setProject(project);
    expect(service.project).toBe(project);
  });

  it('should get undefined Basic Details', () => {
    service.project = undefined;
    expect(service.getBasicDetails).toBe(undefined);
  });

  it('should get Basic Details', () => {
    service.project = project;
    expect(service.getBasicDetails).toEqual(basicDetails);
  });

  it('should set Basic Details', () => {
    service.project = project;
    service.vendorName = 'Morgan Stanley';
    apiServiceSpy.getVendorData.and.returnValue(of(vendors));
    service.setBasicDetails(basicDetails);

    expect(service.getBasicDetails).toEqual(basicDetails);
  });
});
