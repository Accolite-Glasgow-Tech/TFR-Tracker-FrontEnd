import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TFRLocationCountURL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorLocationService {
  constructor(private http: HttpClient) {}

  readTfrLocationCountUrl(): Observable<any> {
    return this.http.get(TFRLocationCountURL);
  }
}
