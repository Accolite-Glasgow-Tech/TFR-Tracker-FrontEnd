import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  AllocatedResourceTypeDTO,
  ClientAttributeDTO,
  ClientDTO,
  Project,
  ProjectBasicDetails,
} from 'src/app/shared/interfaces';

export const DummyProject: Project = {
  id: 1,
  name: 'Bench Project',
  notes: '',
  client_id: 2,
  start_date: new Date('2022-12-12T09:00:00.000+00:00'),
  end_date: new Date('2022-12-31T23:59:59.000+00:00'),
  status: 'INPROGRESS',
  version: 1,
  client_specific: {
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
      status: 'APPROVED',
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
      status: 'APPROVED',
    },
    {
      id: 1,
      project_id: 1,
      name: 'backend',
      description: 'backend desccription',
      start_date: new Date('2022-12-12T09:00:00.000+00:00'),
      delivery_date: new Date('2022-12-16T23:59:59.000+00:00'),
      acceptance_date: new Date('2022-12-31T23:59:59.000+00:00'),
      is_deleted: false,
      status: 'APPROVED',
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
      seniority: 'JUNIOR',
      is_deleted: false,
    },
    {
      project_id: 1,
      resource_id: 1,
      role: 'SCRUM_MASTER',
      seniority: 'SENIOR',
      is_deleted: false,
    },
    {
      project_id: 1,
      resource_id: 2,
      role: 'PROJECT_MANAGER',
      seniority: 'ADVANCED',
      is_deleted: false,
    },
  ],
  resources_count: 4,
};

export const DummyProject2: Project = {
  id: 2,
  name: 'Treasury Project',
  notes: 'Some Notes',
  client_id: 1,
  start_date: new Date('2022-11-12T09:00:00.000+00:00'),
  end_date: new Date('2022-11-31T23:59:59.000+00:00'),
  status: 'DELIVERED',
  version: 5,
  client_specific: {
    Department: 'Banking',
  },
  milestones: [
    {
      id: 4,
      project_id: 2,
      name: 'development',
      description: 'development description',
      start_date: new Date('2022-11-26T09:00:00.000+00:00'),
      delivery_date: new Date('2022-11-31T23:59:59.000+00:00'),
      acceptance_date: new Date('2022-11-31T23:59:59.000+00:00'),
      is_deleted: false,
      status: 'APPROVED',
    },
    {
      id: 5,
      project_id: 2,
      name: 'testing',
      description: 'testing description',
      start_date: new Date('2022-11-19T09:00:00.000+00:00'),
      delivery_date: new Date('2022-11-23T23:59:59.000+00:00'),
      acceptance_date: new Date('2022-11-31T23:59:59.000+00:00'),
      is_deleted: false,
      status: 'PENDING REVIEW',
    },
  ],
  is_deleted: false,
  created_by: 3,
  modified_by: 5,
  created_at: new Date('2022-11-01T08:00:00.000+00:00'),
  modified_at: new Date('2022-11-05T10:00:00.000+00:00'),
  project_resources: [
    {
      project_id: 2,
      resource_id: 4,
      role: 'SOFTWARE_DEVELOPER',
      seniority: 'JUNIOR',
      is_deleted: false,
    },
    {
      project_id: 2,
      resource_id: 5,
      role: 'SCRUM_MASTER',
      seniority: 'SENIOR',
      is_deleted: false,
    },
  ],
  resources_count: 3,
};

export const DummyAllocatedResources: AllocatedResourceTypeDTO[] = [
  {
    project_id: 1,
    resource_id: 1,
    resource_name: 'John Bowers',
    resource_email: 'johnbowers@accolitedigital.com',
    seniority: 'SENIOR',
    is_deleted: false,
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

export const DummyClientAttributes: ClientAttributeDTO[] = [
  {
    client_id: 1,
    attribute_name: 'Cost Center',
    is_deleted: false,
  },
  {
    client_id: 1,
    attribute_name: 'Super Department',
    is_deleted: false,
  },
  {
    client_id: 1,
    attribute_name: 'Department',
    is_deleted: false,
  },
];

class dummy {
  attributes: ClientAttributeDTO[] = [
    {
      client_id: 1,
      attribute_name: 'Cost Center',
      is_deleted: false,
    },
    {
      client_id: 1,
      attribute_name: 'Super Department',
      is_deleted: false,
    },
    {
      client_id: 1,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      client_id: 1,
      attribute_name: 'Division',
      is_deleted: false,
    },
    {
      client_id: 1,
      attribute_name: 'ED/MD',
      is_deleted: false,
    },
    {
      client_id: 2,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      client_id: 2,
      attribute_name: 'ED/MD',
      is_deleted: true,
    },
    {
      client_id: 3,
      attribute_name: 'Cost Center',
      is_deleted: false,
    },
    {
      client_id: 4,
      attribute_name: 'Division',
      is_deleted: false,
    },
    {
      client_id: 5,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      client_id: 5,
      attribute_name: 'ED/MD',
      is_deleted: false,
    },
  ];
}

export class DummyData {
  static readonly dummy = new dummy();
}

export const DummyProjectBasicDetailsInProgress: ProjectBasicDetails = {
  name: 'Bench Project',
  start_date: new Date('2022-12-12T09:00:00.000+00:00'),
  end_date: new Date('2022-12-31T23:59:59.000+00:00'),
  client_id: 2,
  client_specific: {
    Department: 'Finance',
    'ED/MD': 'Julia Lee',
  },
  status: 'IN PROGRESS',
};

export const DummyProjectBasicDetailsDraft: ProjectBasicDetails = {
  name: 'Bench Project',
  start_date: new Date('2022-12-12T09:00:00.000+00:00'),
  end_date: new Date('2022-12-31T23:59:59.000+00:00'),
  client_id: 2,
  client_specific: {
    Department: 'Finance',
    'ED/MD': 'Julia Lee',
  },
  status: 'DRAFT',
};

export const DummyClient: ClientDTO = {
  id: 1,
  name: 'Morgan Stanley',
};

// Http Responses

export const DummyProjectResponseOk: HttpResponse<Project> =
  new HttpResponse<Project>({
    url: 'http://localhost:8080/projects/1',
    body: DummyProject,
    status: 200,
  });

export const DummyError400: HttpErrorResponse = new HttpErrorResponse({
  status: 400,
});

export const DummyError412: HttpErrorResponse = new HttpErrorResponse({
  status: 412,
});

export const DummyError500: HttpErrorResponse = new HttpErrorResponse({
  status: 500,
});

export const DummyError0: HttpErrorResponse = new HttpErrorResponse({
  status: 0,
});
