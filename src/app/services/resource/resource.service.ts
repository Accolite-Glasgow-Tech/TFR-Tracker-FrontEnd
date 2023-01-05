import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  port = 8080;
  baseURL = 'http://localhost:' + this.port;
  abrigedResourceListURL = this.baseURL + '/resources/names';
  resourceRoleURL = this.baseURL + '/resources/roles';

  constructor(private http: HttpClient) {}

  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(this.abrigedResourceListURL);
  }

  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceRoleURL);
  }
}
