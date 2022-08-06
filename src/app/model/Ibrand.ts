import { Iproduct } from "./iproduct";

export interface IBrand {
    brandId:number ; 
    name:string; 
    logo:string;
    products:Iproduct[],
}
