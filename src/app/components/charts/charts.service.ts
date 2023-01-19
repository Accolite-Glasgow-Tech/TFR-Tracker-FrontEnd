import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TFRStatusCountURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}

  readTfrStatusData(): Observable<any> {
    return this.http.get(TFRStatusCountURL);
  }
}
