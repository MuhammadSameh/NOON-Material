import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, observable, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from '../model/Ibrand';
import { ICategory } from '../model/Icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private httpCleint:HttpClient) { }
    getAllCategories():Observable<ICategory[]>{
      return this.httpCleint.get<ICategory[]>(`${environment.APIURL}/Category`)
      .pipe(
        //retry(2),
        //catchError(this.handleError),
        //for subcategories only 
        //map(data=>data.filter(item=>item.parentId !=null))
      )
    }
    getParentCategoreis():Observable<ICategory[]>{
      return this.httpCleint.get<ICategory[]>(`${environment.APIURL}/Category/parentCategories`)
      .pipe(
        //retry(2),
        //catchError(this.handleError)
      )
    }
    getCategoryById(cID:number):Observable<ICategory>{
        return this.httpCleint.get<ICategory>(`${environment.APIURL}/Category/${cID}`)
        .pipe(
        //retry(2),
        //catchError(this.handleError)
        )
    }
    addNewCategory(newCate:ICategory):Observable<ICategory>{
      return this.httpCleint.post<ICategory>(`${environment.APIURL}/Category`,newCate)
      .pipe(
        //retry(2),
        //catchError(this.handleError)
      )
    }
    updateCategory(cID:number,newCate:ICategory):Observable<ICategory>{
      return this.httpCleint.post<ICategory>(`${environment.APIURL}/Category/${cID}`,newCate)
      .pipe(
        //retry(2),
        //catchError(this.handleError)
      )
    }
    deleteCategory(cID:number):Observable<any>{
      return this.httpCleint.delete(`${environment.APIURL}/Category/${cID}`)
      .pipe(
        //retry(2),
        //catchError(this.handleError)
      )
    }
    
    getTopBrandForCategory(cID:number):Observable<IBrand[]>{

      return this.httpCleint.get<IBrand[]>(`${environment.APIURL}/Category/topbrands/${cID}`)
    }
   
    getSubCategoryForParent(parentCate:string):Observable<ICategory[]>{
         return this.httpCleint.get<ICategory[]>(`${environment.APIURL}/Category/subcategories/${parentCate}`)

    }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
