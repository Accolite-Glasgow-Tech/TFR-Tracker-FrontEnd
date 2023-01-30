import { ResourceDTO } from './shared/interfaces';

export const user: ResourceDTO = {
  id: 1,
  first_name: 'John',
  last_name: 'Bowers',
  type: 'STAFF',
  start_date: new Date('2016-12-12T09:00:00.000+00:00'),
  seniority: 'SENIOR',
  email: 'johnbowers@accolitedigital.com',
  is_deleted: false,
};
