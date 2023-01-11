import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetVendorProjectCountService {
  constructor(private http: HttpClient) {}
  private TfrLocationCountUrl = 'http://localhost:8080/tfrLocationCount';
}
