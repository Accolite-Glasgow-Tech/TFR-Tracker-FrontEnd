import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable, retry } from "rxjs";
import { loginResponse, registerResponse } from "src/app/components/user/user.component";
@Injectable({
    providedIn:'root'
})

export class userService{

    url_register='http://localhost:8080/register'

    url_login = 'http://localhost:8080/login'

    constructor(public httpClient : HttpClient){

    }

    register(body:any){
        return this.httpClient.post<registerResponse>(this.url_register,body)
    }

    login(body:any){
        return this.httpClient.post<loginResponse>(this.url_login,body)
    }

    
}
