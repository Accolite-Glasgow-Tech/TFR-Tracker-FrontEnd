import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { clientProjectCountURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WidgetClientProjectCountService {
  constructor(private http: HttpClient) {}

  readClientProjectCountUrlUrl(): Observable<any> {
    return this.http.get(clientProjectCountURL);
  }
}
