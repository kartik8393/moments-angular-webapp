import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  token=sessionStorage.getItem('token')
  
  getRequest(url): Observable<{}> {
    return this.http.get(environment.development_url+url,{ headers: new HttpHeaders({'token':this.token}), observe : 'response'})
  }

  postRequest(url, body): Observable<{}> {
    // console.log(this.token)
    return this.http.post(environment.development_url+url,body,{ headers: new HttpHeaders({'token':this.token}), observe : 'response'})
  }

  putRequest(url,body): Observable<{}> {
    return this.http.put(environment.development_url+url,body,{ headers: new HttpHeaders({'token':this.token}), observe : 'response'})
  }

  putRequestWithParam(url,body,id): Observable<{}> {
    return this.http.put(environment.development_url+url+"/"+id,body,{ headers: new HttpHeaders({'token':this.token}), observe : 'response'})
  }

  deleteRequest(url): Observable<{}> {
    
    return this.http.delete(environment.development_url+url,{headers: new HttpHeaders({'token':this.token}),observe : 'response'})
  }
}
