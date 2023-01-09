import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from 'src/app/shared/app.constants';
import { ResourceListType } from 'src/app/types/types';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  detailedResourceListURL =
    APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/names';
  rolesURL = APPCONSTANTS.APICONSTANTS.BASE_URL + '/resources/roles';
  roleHashMap = new Map();

  constructor(private http: HttpClient) {}

  /*
    Returns all the available resources in the database.

    Each ResourceListType object contains the resource's id, name, email and
    selected with a boolean value of FALSE. 
  */
  getAllResources(): Observable<ResourceListType[]> {
    return this.http.get<ResourceListType[]>(this.detailedResourceListURL);
  }

  /*
    Returns all the roles that can be assigned to a resource in a 
    project.
  */
  getAllRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.rolesURL);
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
    Convert the date obtained from Database to better display
    format

    YYYY-MM-DD, HH:MM
  */
  prettyPrintDate(dateTime: string): string {
    let time = dateTime.substring(11, 16);
    let date = dateTime.substring(0, 10);

    return date + ', ' + time;
  }
}
