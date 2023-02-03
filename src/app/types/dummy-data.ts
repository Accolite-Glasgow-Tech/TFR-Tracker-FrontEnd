import { Project } from 'src/app/shared/interfaces';
import { VendorAttributeDTO } from 'src/app/shared/interfaces';

class dummy {
  attributes: VendorAttributeDTO[] = [
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
