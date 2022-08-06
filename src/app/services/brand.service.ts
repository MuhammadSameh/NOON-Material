import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand } from '../model/Ibrand';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient) { 

  }

  getAllBrand():Observable<IBrand[]>{
    return this.httpClient.get<IBrand[]>(`${environment.APIURL}/brand`) ; 
  
  }
  
}
