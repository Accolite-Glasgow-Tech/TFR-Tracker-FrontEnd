import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from 'src/app/shared/app.constants';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  abrigedResourceListURL =
    APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/names';
  resourceRoleURL = APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/roles';
  roleHashMap = new Map();

  constructor(private http: HttpClient) {}

  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(this.abrigedResourceListURL);
  }

  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.resourceRoleURL);
  }

  convertRoleEnum(roles: string[]): string[] {
    let rolesToBeDisplayed: string[] = [];
    roles.forEach((role) => {
      let cleanRole = role.replace(/_/g, ' ');
      rolesToBeDisplayed.push(cleanRole);
      this.roleHashMap.set(role, cleanRole);
    });

    return rolesToBeDisplayed;
  }

  getAssociatedEnumRole(cleanRole: string): string {
    for (let [key, value] of this.roleHashMap.entries()) {
      if (value === cleanRole) return key;
    }
    return '';
  }

  getAssociatedCleanRole(role: string): string {
    return this.roleHashMap.get(role);
  }
}
