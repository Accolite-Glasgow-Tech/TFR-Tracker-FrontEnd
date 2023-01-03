import { Injectable } from '@angular/core';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  mockedResources: ResourceListType[] = [
    { resource_name: 'Laura', resource_id: 1, selected: false },
    { resource_name: 'Rishali', resource_id: 2, selected: false },
    { resource_name: 'Marek', resource_id: 3, selected: false },
    { resource_name: 'Jack', resource_id: 4, selected: false },
    { resource_name: 'Mani', resource_id: 5, selected: false },
    { resource_name: 'Tom', resource_id: 6, selected: false },
  ];

  roles: string[] = [
    'PRODUCT_OWNER',
    'PROJECT_MANAGER',
    'SCRUM_MASTER',
    'BUSINESS_ANALYST',
    'SOFTWARE_DEVELOPER',
    'TEAM_LEAD',
    'UX_UI_DESIGNER',
  ];

  constructor() {}

  getAllResources(): ResourceListType[] {
    return this.mockedResources;
  }

  getAllRoles(): string[] {
    return this.roles.map((role) => role.replace(/_/g, ' '));
  }
}
