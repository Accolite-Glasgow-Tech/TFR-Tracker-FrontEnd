import { VendorAttribute, Project } from './types';

class dummy {
  attributes: VendorAttribute[] = [
    { vendor_id: 1, attributeName: 'Department' },
    { vendor_id: 1, attributeName: 'Cost Center' },
    { vendor_id: 1, attributeName: 'City' },
    { vendor_id: 1, attributeName: 'Manager' },
    { vendor_id: 2, attributeName: 'Super Department' },
    { vendor_id: 2, attributeName: 'Department' },
    { vendor_id: 2, attributeName: 'Supervisor' },
    { vendor_id: 3, attributeName: 'Cost Center' },
    { vendor_id: 3, attributeName: 'Department ID' },
  ];
}

// let testProject: Project = {
//   id: 1,
//   name: 'Test Project',
//   vendor_id: 3,
//   start_date: new Date('2023-01-01'),
//   end_date: new Date('2023-02-01'),
//   status: 'INPROGRESS',
//   version: 1,
//   vendor_specific: `{"Cost Center": "Test Centre", "Department ID":"1"}`,
//   milestones: [],
//   project_resources: [],
//   is_deleted: false,
// };

export class DummyData {
  static readonly dummy = new dummy();
  // static project: Project = testProject;
}
