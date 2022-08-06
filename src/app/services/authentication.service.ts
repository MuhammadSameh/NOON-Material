import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   isLoggedIn:boolean = false;
  constructor() { }

  isAuthenticated(){
    return this.isLoggedIn;
  }

}
