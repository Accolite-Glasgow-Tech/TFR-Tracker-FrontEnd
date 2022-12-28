import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/types/types';
import { APPCONSTANTS } from 'src/app/shared/app.constants';

const url: string =
  APPCONSTANTS.APICONSTANTS.BASE_URL + APPCONSTANTS.APICONSTANTS.TFR;

@Injectable({
  providedIn: 'root',
})
export class TfrBasicDetailsService {
  constructor(private httpClient: HttpClient) {}

  addOrUpdateProject(project: Project): void {
    console.log('service called create add or update project');
    this.httpClient.put('http://localhost:8080/projects', project).subscribe();
  }
}
