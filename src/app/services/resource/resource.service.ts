import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/constants/contants';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  abrigedResourceListURL = baseURL + '/resources/names';
  resourceRoleURL = baseURL + '/resources/roles';

  constructor(private http: HttpClient) {}

  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(this.abrigedResourceListURL);
  }

  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceRoleURL);
  }
}
