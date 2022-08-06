import { Iinventory, Iproduct } from "./iproduct"

export interface ICart {
    id:number	
    cartItems : {
        inventoryId: number,
        productId: number,
        size: string,
        color: string,
        quantity: number,
        price: number,
        product:Iproduct,
        medias:string[],
        avalibleQuantity:number,
        avalibleQuantityArr:number[]
        description:string
    }[]
}


//Iinventory