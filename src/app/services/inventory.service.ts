import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ifilteration } from '../model/ifilteration';
import { Iinventory, IResponse } from '../model/iproduct';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http:HttpClient) {
   }
   getAllInventories(currentPage:number = 1 , pageSize:number =20 , sortBy:boolean = true):Observable<Iinventory[]>{
         let sort :string = sortBy == true ? "priceAsc" : "priceDesc" 
         return this.http.get<Iinventory[]>(`${environment.APIURL}/Inventory/AllProducts?currentPage=1&pageSize=20?sortBy={sort}`)
   }
   getInventoryById(pid:number):Observable<Iinventory>{
    return this.http.get<Iinventory>(`${environment.APIURL}/Inventory/${pid}`)
   }

   getProductByBrand(brandName:string,sortBy:any= true ,currentPage:number = 1 , pageSize:number =20):Observable<IResponse>{
    //let sort :string = sortBy == true ? "priceAsc" : "priceDesc" 
    let sort :string 
    if(sortBy ==true){sort = "priceAsc"} 
    if(sortBy ==true){sort = "priceDesc"} 
    if(sortBy ==''){sort = ""} 
    return this.http.get<IResponse>(`${environment.APIURL}/Inventory/ProductsByBrand/${brandName}?sortBy=${sort}&currentPage=${currentPage}&pageSize=${pageSize}`)
  }

  getProductByCategory(cateName:string,sortBy:any = true ,pageSize:number =20 , currentPage:number = 1):Observable<IResponse>{
    //= sortBy == true ? "priceAsc" : "priceDesc"
    let sort :string 
    if(sortBy ==true){sort = "priceAsc"} 
    if(sortBy ==true){sort = "priceDesc"} 
    if(sortBy ==''){sort = ""} 
    return this.http.get<IResponse>(`${environment.APIURL}/Inventory/ProductsByCategory/${cateName}?sortBy=${sort}&pageSize=${pageSize}&currentPage=${currentPage}`)

  }

  getFilteredPorducts( filteration:Ifilteration, sortBy:boolean ,cateName:string ,pageSize:number,currentPage:number ):Observable<IResponse>{
    let sort :string = sortBy == true ? "priceAsc" : "priceDesc" 
    return this.http.get<IResponse>(`https://localhost:44375/api/Inventory/Filtration?categoryName=${cateName}&sortBy=${sort}&color=${filteration.color}&brandId=${filteration.brand}&PriceMin=${filteration.minPrice}&PriceMax=${filteration.maxPrice}&pageSize=${pageSize}&currentPage=${currentPage}`)
  }

  getInventoriesByProduct(pId:number):Observable<Iinventory[]>{
    return this.http.get<Iinventory[]>(`${environment.APIURL}/Inventory/GetInventoriesByProduct/${pId}`)
  }


}
