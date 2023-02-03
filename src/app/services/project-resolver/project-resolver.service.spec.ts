import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import { DummyProject } from 'src/app/types/dummy-data';
import { ApiService } from '../api/api.service';

import { ProjectResolverService } from './project-resolver.service';

describe('ProjectResolverService', () => {
  let service: ProjectResolverService;
  let route: ActivatedRouteSnapshot;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getProject']);
    route = new ActivatedRouteSnapshot();

    TestBed.configureTestingModule({
      providers: [
        ProjectResolverService,
        { provide: ApiService, useValue: spy },
      ],
    });
    service = TestBed.inject(ProjectResolverService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call resolve() and return project obj', () => {
    const dummyProject: Project = DummyProject;
    let httpResponseProject: HttpResponse<Project> = new HttpResponse({
      body: dummyProject,
    });

    apiServiceSpy.getProject.and.returnValue(of(httpResponseProject));

    service.resolve(route).subscribe((project) => {
      expect(project).toEqual(httpResponseProject);
    });
  });
});
