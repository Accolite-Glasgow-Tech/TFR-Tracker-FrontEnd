import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  AllocatedResourceTypeDTO,
  ClientDTO,
  MilestoneDTO,
  Project,
  ProjectBasicDetails,
  ProjectResourceDTO,
} from 'src/app/shared/interfaces';
import {
  DummyAllocatedResources,
  DummyClients,
  DummyError412,
  DummyError500,
  DummyProject,
  DummyProjectResponseOk,
  DummyProjectUndefinedResponse,
} from 'src/app/types/dummy-data';
import { ApiService } from '../api/api.service';
import { ResponseHandlerService } from '../response-handler/response-handler.service';
import { TfrManagementService } from './tfr-management.service';

export const WINDOW = new InjectionToken('Window');

describe('TfrManagementService', () => {
  let service: TfrManagementService;
  let responseHandlerServiceSpy: jasmine.SpyObj<ResponseHandlerService>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let milestones: MilestoneDTO[];
  let projectResources: ProjectResourceDTO[];
  let projectResourcesWithNames: AllocatedResourceTypeDTO[];
  let project: Project;
  let clientName: string;
  let basicDetails: ProjectBasicDetails;
  let clients: ClientDTO[];
  let windowMock = {
    location: {
      reload: jasmine.createSpy('reload'),
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        {
          provide: ResponseHandlerService,
          useValue: jasmine.createSpyObj('ResponseHandlerService', [
            'goodSave',
            'handleBadProjectUpdate',
          ]),
        },
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'getClients',
            'postProject',
            'putStatus',
            'putProject',
            'getProject',
            'putProjectResources',
            'getResourcesNamesByProjectIdFromDatabase',
            ,
            'getHasWritePermission',
          ]),
        },
        { provide: WINDOW, useValue: windowMock },
      ],
    });

    responseHandlerServiceSpy = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    service = TestBed.inject(TfrManagementService);

    project = { ...DummyProject };

    milestones = project.milestones;
    projectResources = project.project_resources;

    basicDetails = (({
      name,
      start_date,
      end_date,
      client_id,
      client_specific,
      status,
    }) => ({ name, start_date, end_date, client_id, client_specific, status }))(
      project
    );

    clients = DummyClients;

    projectResourcesWithNames = DummyAllocatedResources;
    service.project = project;

    apiServiceSpy.postProject.and.returnValue(of(1));
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

  it('should get Client Name', () => {
    clientName = 'Morgan Stanley';
    service.clientName = clientName;
    expect(service.getClientName).toBe(clientName);
  });

  it('should get Resources Count', () => {
    expect(service.getResourcesCount).toBe(4);
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

  it('should compareBasicDetails - same object', () => {
    let result = service.compareBasicDetails(basicDetails);

    expect(service.project).toEqual(project);
    expect(service.getBasicDetails).toEqual(basicDetails);
    expect(result).toBe(true);
  });

  it('should set Basic Details - Project already defined', () => {
    apiServiceSpy.putProject.and.returnValue(of(1));
    apiServiceSpy.getClients.and.returnValue(of(clients));
    service.project = project;

    basicDetails.name = 'Portfolio Management Project';
    service.setBasicDetails(basicDetails, true);
    expect(service.project?.name).toBe(basicDetails.name);
  });

  it('should set Basic Details ', () => {
    service.project = project;
    expect(service.compareBasicDetails(basicDetails)).toBe(true);
    service.setBasicDetails(basicDetails, true).subscribe((response) => {
      expect(response).toBe(true);
    });
  });

  it('should update project to db - success', () => {
    apiServiceSpy.putProject.and.returnValue(of(1));
    service.project = project;
    service.updateProjectToDatabase();
    expect(service.project.version).toBe(1);
  });

  it('should update project to db - failure bad versioning', () => {
    let httpErrorResponse: HttpErrorResponse = DummyError412;

    service.updateProjectToDatabaseObserver.error(httpErrorResponse);
    expect(
      responseHandlerServiceSpy.handleBadProjectUpdate
    ).toHaveBeenCalledWith(httpErrorResponse);
  });

  it('should update project to db - failure server error', () => {
    let httpErrorResponse: HttpErrorResponse = DummyError500;

    service.updateProjectToDatabaseObserver.error(httpErrorResponse);

    expect(
      responseHandlerServiceSpy.handleBadProjectUpdate
    ).toHaveBeenCalledWith(httpErrorResponse);
  });

  it('should create project - error', () => {
    let error: HttpErrorResponse = DummyError500;
    service.createProjectObserver.error(error);
    expect(
      responseHandlerServiceSpy.handleBadProjectUpdate
    ).toHaveBeenCalledWith(error);
    service.subject.subscribe((response) => {
      expect(response).toBe(false);
    });
  });

  it('should make API call to create project in db', () => {
    service.project = project;
    apiServiceSpy.postProject.and.returnValue(of(1));
    let httpResponse = DummyProjectResponseOk;
    apiServiceSpy.getProject.and.returnValue(of(httpResponse));

    service.createProjectInDatabase();
    expect(service.project?.id).toBe(1);
    expect(service.project?.version).toBe(1);
    expect(responseHandlerServiceSpy.goodSave).toHaveBeenCalled();
    service.subject.subscribe((response) => {
      expect(response).toBe(true);
    });
  });

  it('should create a new project by setting basic details', () => {
    let httpResponse = DummyProjectResponseOk;
    service.project = undefined;
    apiServiceSpy.getClients.and.returnValue(of(clients));
    apiServiceSpy.postProject.and.returnValue(of(2));
    apiServiceSpy.getProject.and.returnValue(of(httpResponse));
    service.setBasicDetails(basicDetails, true);
    expect(service.getBasicDetails).toEqual(basicDetails);
  });

  it('should compare basic details undefined project', () => {
    service.project = undefined;
    let result = service.compareBasicDetails(basicDetails);
    expect(result).toBe(false);
  });

  it('should compare basic details not equal', () => {
    let anotherBasicDetails = {
      name: 'Bank Project',
      start_date: new Date('2022-12-24T09:00:00.000+00:00'),
      end_date: new Date('2022-12-09T23:59:59.000+00:00'),
      status: 'INPROGRESS',
      client_id: 3,
      client_specific: {
        Department: 'Wealth Management',
        'ED/MD': 'Amy Phutty',
      },
    };
    service.project = project;
    expect(service.compareBasicDetails(anotherBasicDetails)).toBe(false);
  });

  it('should set project resources', () => {
    project.project_resources = [];
    service.project = project;
    service.setProjectResources(projectResources);
    expect(service.project.project_resources).toEqual(projectResources);
  });

  it('should set project resources with names', () => {
    service.setProjectResourcesWithNames(projectResourcesWithNames);

    expect(service.projectResourcesWithNames).toEqual(
      projectResourcesWithNames
    );
  });

  it('should update project to resource mapping in db success', () => {
    apiServiceSpy.putProjectResources.and.returnValue(of(1));
    service.project = project;
    service.updateProjectToResourceMapping();
    expect(service.project.version).toBe(1);
  });

  it('should extract project success', () => {
    let httpResponse = DummyProjectResponseOk;
    expect(service.extractProject(httpResponse)).toEqual(httpResponse);
    expect(service.project).toEqual(project);
  });

  it('should extract project failure', () => {
    let httpResponse = DummyProjectUndefinedResponse;
    expect(service.extractProject(httpResponse)).toEqual(httpResponse);
    expect(service.project).toEqual(undefined);
  });

  it('should update project status to db', () => {
    apiServiceSpy.putStatus.and.returnValue(of(true));
    let result = service.updateStatusToDatabase();
    result.subscribe((response) => expect(response).toBe(true));
  });

  it('should set resources count', () => {
    service.setResourcesCount(1);
    expect(service.project?.resources_count).toBe(1);
  });

  it('should retrieve project - 500 error', () => {
    let response = {
      project: {
        status: 500,
      },
    };
    let observer = service.getProjectObserver;
    observer.next(response);
    expect(service.errorCode).toBe(404);
  });

  it('should retrieve project - 503 error', () => {
    let response = {
      project: {
        status: 503,
      },
    };
    let observer = service.getProjectObserver;
    observer.next(response);
    expect(service.errorCode).toBe(503);
  });

  it('should retrieve project', () => {
    let response = {
      project: project,
    };

    apiServiceSpy.getHasWritePermission.and.returnValue(of(true));
    apiServiceSpy.getResourcesNamesByProjectIdFromDatabase.and.returnValue(
      of(projectResourcesWithNames)
    );
    apiServiceSpy.getClients.and.returnValue(of(clients));
    let observer = service.getProjectObserver;
    observer.next(response);
    expect(service.projectResourcesWithNames).toEqual(
      projectResourcesWithNames
    );
    expect(service.project).toEqual(project);
    expect(
      apiServiceSpy.getResourcesNamesByProjectIdFromDatabase
    ).toHaveBeenCalledWith(1);
  });

  it('should emit client reset', () => {
    spyOn(service.clientReset, 'emit');
    service.resetClientDetails();
    expect(service.clientReset.emit).toHaveBeenCalledWith(true);
  });

  it('should set project notes', () => {
    apiServiceSpy.putProject.and.returnValue(of(1));
    service.project = project;
    expect(service.project.notes).toBe('');
    service.setNotes('Hello World');
    expect(service.project.notes).toBe('Hello World');
    expect(apiServiceSpy.putProject).toHaveBeenCalled();
  });

  it('should set server down', () => {
    service.setServerDown();
    expect(service.errorCode).toBe(503);
  });
});
