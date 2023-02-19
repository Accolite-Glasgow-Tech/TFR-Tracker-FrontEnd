import { HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Project } from 'src/app/shared/interfaces';
import {
  DummyError0,
  DummyError500,
  DummyError503,
  DummyProject,
  DummyProjectResponseOk,
} from 'src/app/types/dummy-data';
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

  it('should call resolve() - return project', () => {
    const dummyProject: Project = DummyProject;
    let httpResponseProject: HttpResponse<Project> = DummyProjectResponseOk;

    apiServiceSpy.getProject.and.returnValue(of(httpResponseProject));

    service.resolve(route).subscribe((project) => {
      expect(project).toEqual(dummyProject);
    });
  });

  it('should call resolve() - catch error - server error', () => {
    const err = DummyError0;
    apiServiceSpy.getProject.and.returnValue(throwError(() => err));

    service.resolve(route).subscribe((response) => {
      const expectedResponse = DummyError503;
      expect(response).toEqual(expectedResponse);
    });
  });

  it('should call resolve() - catch error - project does not exist', () => {
    const err = DummyError500;
    apiServiceSpy.getProject.and.returnValue(throwError(() => err));

    service.resolve(route).subscribe((response) => {
      expect(response).toEqual(err);
    });
  });
});
