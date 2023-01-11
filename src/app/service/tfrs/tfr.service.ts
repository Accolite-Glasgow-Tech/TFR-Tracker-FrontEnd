import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable, retry } from "rxjs";
import { PeriodicElement } from "src/app/components/tfrs/tfrs.component";
@Injectable({
    providedIn:'root'
})

export class tfrService{

    url_All_Projects='http://localhost:8080/search/project/all'

    url_get_Projects_By_Post='http://localhost:8080/search/project'

    url_All_Vendors='http://localhost:8080/search/vendors/all'
    
    constructor(public httpClient : HttpClient){

    }
    getAllProjects(): Observable<PeriodicElement[]>{
        return this.httpClient.get<PeriodicElement[]>(this.url_All_Projects);
    }

    getAllVendors(){
        return this.httpClient.get(this.url_All_Vendors)
    }

    getProjects(body:any):Observable<PeriodicElement[]>{
        return this.httpClient.post<PeriodicElement[]>(this.url_get_Projects_By_Post,body)
        
    }

}