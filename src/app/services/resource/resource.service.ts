import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  port = 8080;
  abrigedResourceListURL = 'http://localhost:' + this.port + '/resources/names';

  mockedResources: ResourceListType[] = [
    {
      resource_name: 'Laura',
      resource_id: 1,
      resource_email: 'laura@accolitedigital.com',
      selected: false,
    },
    {
      resource_name: 'Rishali',
      resource_id: 2,
      resource_email: 'rishali@accolitedigital.com',
      selected: false,
    },
    {
      resource_name: 'Marek',
      resource_id: 3,
      resource_email: 'marek@accolitedigital.com',
      selected: false,
    },
    {
      resource_name: 'Jack',
      resource_id: 4,
      resource_email: 'jack@accolitedigital.com',
      selected: false,
    },
    {
      resource_name: 'Mani',
      resource_id: 5,
      resource_email: 'mani@accolitedigital.com',
      selected: false,
    },
    {
      resource_name: 'Tom',
      resource_id: 6,
      resource_email: 'tom@accolitedigital.com',
      selected: false,
    },
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

  constructor(private http: HttpClient) {}

  // getAllResources(): Observable<ResourceListType[]> {
  //   return this.http.get<ResourceListType[]>('http://localhost:8080/resources/names');
  // }

  getAllResources(): ResourceListType[] {
    return this.mockedResources;
  }

  getAllRoles(): string[] {
    return this.roles.map((role) => role.replace(/_/g, ' '));
  }
}
