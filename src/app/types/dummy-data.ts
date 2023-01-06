import { VendorAttribute, Project } from './types';

class dummy {
  attributes: VendorAttribute[] = [
    { vendorId: 1, attributeName: 'Department' },
    { vendorId: 1, attributeName: 'Cost Center' },
    { vendorId: 1, attributeName: 'City' },
    { vendorId: 1, attributeName: 'Manager' },
    { vendorId: 2, attributeName: 'Super Department' },
    { vendorId: 2, attributeName: 'Department' },
    { vendorId: 2, attributeName: 'Supervisor' },
    { vendorId: 3, attributeName: 'Cost Center' },
    { vendorId: 3, attributeName: 'Department ID' },
  ];
}

// let testProject: Project = {
//   id: 1,
//   name: 'Test Project',
//   vendorId: 3,
//   startDate: new Date('2023-01-01'),
//   endDate: new Date('2023-02-01'),
//   status: 'INPROGRESS',
//   version: 1,
//   vendorSpecific: `{"Cost Center": "Test Centre", "Department ID":"1"}`,
//   milestones: [],
//   projectResources: [],
//   isDeleted: false,
// };

export class DummyData {
  static readonly dummy = new dummy();
  // static project: Project = testProject;
}
