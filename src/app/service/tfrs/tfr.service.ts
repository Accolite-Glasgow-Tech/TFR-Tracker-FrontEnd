import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from 'src/app/components/tfrs/tfrs.component';
import {
  allProjectsURL,
  projectSearchURL,
  vendorsURLdupe,
} from 'src/app/shared/constants';
@Injectable({
  providedIn: 'root',
})
export class tfrService {
  constructor(public httpClient: HttpClient) {}
  getAllProjects(): Observable<PeriodicElement[]> {
    return this.httpClient.get<PeriodicElement[]>(allProjectsURL);
  }

  getAllVendors() {
    return this.httpClient.get(vendorsURLdupe);
  }

  getProjects(body: any): Observable<PeriodicElement[]> {
    return this.httpClient.post<PeriodicElement[]>(projectSearchURL, body);
  }
}
