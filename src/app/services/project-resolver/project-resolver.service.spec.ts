import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';

import { ProjectResolverService } from './project-resolver.service';

describe('ProjectResolverService', () => {
  let service: ProjectResolverService;
  let route: ActivatedRouteSnapshot;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'getProject',
    ]);
    route = new ActivatedRouteSnapshot();

    TestBed.configureTestingModule({
      providers: [
        ProjectResolverService,
        { provide: ApiService, useValue: spy },
      ],
    });
    service = TestBed.inject(ProjectResolverService);
    apiServiceSpy = TestBed.inject(
      ApiService
    ) as jasmine.SpyObj<ApiService>;
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
          name: 'deployment',
          description: 'deployment description',
          start_date: new Date('2022-12-26T09:00:00.000+00:00'),
          delivery_date: new Date('2022-12-31T23:59:59.000+00:00'),
          acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
          is_deleted: true,
        },
        {
          id: 2,
          project_id: 1,
          name: 'frontend',
          description: 'frontend description',
          start_date: new Date('2022-12-19T09:00:00.000+00:00'),
          delivery_date: new Date('2022-12-23T23:59:59.000+00:00'),
          acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
          is_deleted: false,
        },
        {
          id: 1,
          project_id: 1,
          name: 'backend',
          description: 'backend description',
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

    let httpResponseProject: HttpResponse<Project> = new HttpResponse({
      body: dummyProject,
    });

    apiServiceSpy.getProject.and.returnValue(
      of(httpResponseProject)
    );

    service.resolve(route).subscribe((project) => {
      expect(project).toEqual(httpResponseProject);
    });
  });
});
