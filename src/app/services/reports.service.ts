import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  getResourceTFRList(resourceId: number) {
    return this.httpClient
      .get('http://localhost:8080/resources/' + resourceId + '/projects')
      .subscribe();
  }

  createTask() {
    // this.httpClient.post()
  }
}
