import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor( private httpClient: HttpClient) { }
  getVendorData(){
    return this.httpClient.get(this.url);
  }
}
