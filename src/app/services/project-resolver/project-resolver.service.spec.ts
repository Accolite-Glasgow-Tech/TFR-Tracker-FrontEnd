import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Project } from 'src/app/types/types';
import { TfrManagementService } from '../tfr-management/tfr-management.service';

import { ProjectResolverService } from './project-resolver.service';

describe('ProjectResolverService', () => {
  let service: ProjectResolverService;
  let route: ActivatedRouteSnapshot;
  let tfrManagementServiceSpy: jasmine.SpyObj<TfrManagementService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TfrManagementService', [
      'getFromDatabase',
    ]);
    route = new ActivatedRouteSnapshot();

    TestBed.configureTestingModule({
      providers: [
        ProjectResolverService,
        { provide: TfrManagementService, useValue: spy },
      ],
    });
    service = TestBed.inject(ProjectResolverService);
    tfrManagementServiceSpy = TestBed.inject(
      TfrManagementService
    ) as jasmine.SpyObj<TfrManagementService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call resolve() and return project obj', () => {
    const dummyProject: Project = {
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
      milestones: [
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
      ],
      is_deleted: false,
      created_by: 1,
      modified_by: 2,
      created_at: new Date('2022-12-01T08:00:00.000+00:00'),
      modified_at: new Date('2022-12-05T10:00:00.000+00:00'),
      project_resources: [
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
        {
          project_id: 1,
          resource_id: 2,
          role: 'PROJECT_MANAGER',
        },
      ],
    };

    tfrManagementServiceSpy.getFromDatabase.and.returnValue(of(dummyProject));

    service.resolve(route).subscribe((project) => {
      expect(project).toEqual(dummyProject);
    });
  });
});
