import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  resourceRolesURL,
  seniorityLevelsURL,
  TFRCreationResourceURL,
} from 'src/app/shared/constants';
import {
  AllocatedResourceTypeDTO,
  ResourceListType,
} from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  roleHashMap = new Map();

  constructor(private http: HttpClient) {}

  /*
    Returns all the available resources in the database.

    Each ResourceListType object contains the resource's id, name, email and
    selected with a boolean value of FALSE. 
  */
  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(TFRCreationResourceURL);
  }

  /*
    Returns all the roles that can be assigned to a resource in a 
    project.
  */
  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(resourceRolesURL);
  }

  /*
    Returns all the seniority levels that a resource can be
  */
  getAllSeniorityLevels(): Observable<string[]> {
    return this.http.get<string[]>(seniorityLevelsURL);
  }

  /*
    convert the array of roles which contains underscores to 
    a clean array of roles with no underscores and populate the hashmap 
    with entry as follows:
    
    SCRUM_MASTER -> SCRUM MASTER

  */
  convertRoleEnum(roles: string[]): string[] {
    let rolesToBeDisplayed: string[] = [];
    roles.forEach((role) => {
      let cleanRole = role.replace(/_/g, ' ');
      rolesToBeDisplayed.push(cleanRole);
      this.roleHashMap.set(role, cleanRole);
    });

    return rolesToBeDisplayed;
  }

  /*
    Takes in SCRUM MASTER and returns SCRUM_MASTER
  */
  getAssociatedEnumRole(cleanRole: string): string {
    for (let [key, value] of this.roleHashMap.entries()) {
      if (value === cleanRole) return key;
    }
    return '';
  }

  /*
    Takes in SCRUM_MASTER and returns SCRUM MASTER
  */
  getAssociatedCleanRole(role: string): string {
    return this.roleHashMap.get(role);
  }

  /*
    Get full list of project resources with names that have not been deleted
  */
  resourcesWithoutDeleted(
    resourcesWithNames: AllocatedResourceTypeDTO[] | undefined
  ): AllocatedResourceTypeDTO[] {
    return !resourcesWithNames
      ? []
      : resourcesWithNames.filter(
          (resource: AllocatedResourceTypeDTO) => !resource.is_deleted
        );
  }
}
