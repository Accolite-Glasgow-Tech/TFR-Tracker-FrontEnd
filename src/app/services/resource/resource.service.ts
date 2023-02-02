import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
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
    Returns all the seniority levels that a resource can be
  */
  getAllSeniorityLevels(): Observable<string[]> {
    return this.http.get<string[]>(seniorityLevelsURL);
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
