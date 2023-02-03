import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllocatedResourceTypeDTO } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  roleHashMap = new Map();

  constructor(private http: HttpClient) {}

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
