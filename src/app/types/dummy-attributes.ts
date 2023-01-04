import { VendorAttribute } from './types';

class dummy {
    attributes: VendorAttribute[] = [
        {vendorId: 1, attributeName: 'Department'},
        {vendorId: 1, attributeName: 'Cost Center'},
        {vendorId: 1, attributeName: 'City'},
        {vendorId: 2, attributeName: 'Super Department'},
        {vendorId: 2, attributeName: 'Department'},
        {vendorId: 2, attributeName: 'Supervisor'},
        {vendorId: 3, attributeName: 'Cost Center'},
        {vendorId: 3, attributeName: 'Manager'},
        {vendorId: 3, attributeName: 'Department ID'}
    ]
}

export class DummyData {
    static readonly dummy = new dummy();
  }