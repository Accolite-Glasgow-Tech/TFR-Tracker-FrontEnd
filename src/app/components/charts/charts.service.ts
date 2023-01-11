import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { IStatus } from 'src/app/Interface/Status.Interface';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private TfrStatusUrl = 'http://localhost:8080/projects/statusCount';

  constructor(private http: HttpClient) {
  }

  readTfrStatusData(): Observable<any> {
    return this.http.get(this.TfrStatusUrl);
  }
}
