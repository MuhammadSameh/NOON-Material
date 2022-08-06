import { Iproduct } from "./iproduct";

export interface ICategory {
    categoryId:number, 
    name : string,
    parentId : number ,
    parentCategory?:ICategory,
    products:Iproduct[]
}


