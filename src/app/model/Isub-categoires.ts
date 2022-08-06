import { IBrand } from "./Ibrand";

export interface ISubCategoires {
    subId:number ; 
    SubCateName:string; 
    cateId:number ; 
    mostCommenBrands:IBrand[];
}

//subId:1, name:"mobiles",cateId:1 ,mostCommenBrands:[