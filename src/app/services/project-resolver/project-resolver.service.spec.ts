import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import { DummyProject } from 'src/app/types/dummy-data';
import { ApiService } from '../api/api.service';

import { ProjectResolverService } from './project-resolver.service';

describe('ProjectResolverService', () => {
  let service: ProjectResolverService;
  let route: ActivatedRouteSnapshot;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['getProject']);
    route = new ActivatedRouteSnapshot();

    TestBed.configureTestingModule({
      providers: [
        ProjectResolverService,
        { provide: ApiService, useValue: spy },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
    });
    service = TestBed.inject(ProjectResolverService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call resolve() - return project', () => {
    const dummyProject: Project = DummyProject;
    let httpResponseProject: HttpResponse<Project> = new HttpResponse({
      body: dummyProject,
    });

    apiServiceSpy.getProject.and.returnValue(of(httpResponseProject));

    service.resolve(route).subscribe((project) => {
      expect(project).toEqual(dummyProject);
    });
  });

  it('should call resolve() - return server error', () => {
    const dummyProject: Project = DummyProject;
    let httpResponseProject: HttpResponse<Project> = new HttpResponse({
      body: dummyProject,
      status: 500,
    });

    apiServiceSpy.getProject.and.returnValue(of(httpResponseProject));

    service.resolve(route).subscribe((response) => {
      const expectedResponse = new HttpErrorResponse({ status: 500 });
      expect(response).toEqual(expectedResponse);
    });
  });

  it('should call resolve() - catch error', () => {
    const err = new Error();
    apiServiceSpy.getProject.and.returnValue(throwError(() => err));

    service.resolve(route).subscribe((response) => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/tfrs']);
    });
  });
});
