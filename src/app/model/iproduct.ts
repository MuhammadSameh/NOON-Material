export interface Iproduct{
    productId:number ,
    name:string,
    description:string,
    category : string
    brand : string,
}
export interface Iinventory  {
    inventoryId: number,
    productId: number,
    size: string,
    color: string,
    quantity: number,
    price: number,
    product:Iproduct,
    medias:string[]
}
export interface IResponse {
    data? : Iinventory[],
    pageIndex: number,
    pageSize: number,
    totalPages: number
}





