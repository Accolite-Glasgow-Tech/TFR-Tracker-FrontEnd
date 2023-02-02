import { Project } from 'src/app/shared/interfaces';
import { VendorAttributeDTO } from 'src/app/shared/interfaces';

export const DummyProject: Project = {
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

class dummy {
  attributes: VendorAttributeDTO[] = [
    {
      vendor_id: 1,
      attribute_name: 'Cost Center',
      is_deleted: false,
    },
    {
      vendor_id: 1,
      attribute_name: 'Super Department',
      is_deleted: false,
    },
    {
      vendor_id: 1,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      vendor_id: 1,
      attribute_name: 'Division',
      is_deleted: false,
    },
    {
      vendor_id: 1,
      attribute_name: 'ED/MD',
      is_deleted: false,
    },
    {
      vendor_id: 2,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      vendor_id: 2,
      attribute_name: 'ED/MD',
      is_deleted: true,
    },
    {
      vendor_id: 3,
      attribute_name: 'Cost Center',
      is_deleted: false,
    },
    {
      vendor_id: 4,
      attribute_name: 'Division',
      is_deleted: false,
    },
    {
      vendor_id: 5,
      attribute_name: 'Department',
      is_deleted: false,
    },
    {
      vendor_id: 5,
      attribute_name: 'ED/MD',
      is_deleted: false,
    },
  ];
}

export class DummyData {
  static readonly dummy = new dummy();
}
