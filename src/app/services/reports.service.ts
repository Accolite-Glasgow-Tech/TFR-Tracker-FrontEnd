import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  getResourceTFRList(resourceId: number) {
    return this.httpClient.get('localhost:8080/' + resourceId + '/projects');
  }

  createTask() {
    // this.httpClient.post()
  }
}
