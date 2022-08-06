import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin, IReigster, UserToken } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
httpOption: {};

constructor(private httpClient:HttpClient){
 
}

CreateNewCient(newUser:IReigster):Observable<{id:string}>{
  this.httpOption = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      Authorization: `Bearer ${localStorage.getItem('Auth')}` ?? ""
    })
  }
   return this.httpClient.post<{id:string}>(`${environment.APIURL}/Customer/Register`,JSON.stringify(newUser) ,this.httpOption)
}
Login(UserInfo:ILogin):Observable<UserToken>{
  return this.httpClient.post<UserToken>(`${environment.APIURL}/Customer/Login` , UserInfo);
}


}



