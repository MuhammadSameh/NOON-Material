export interface IReigster {
    userName: string
    email: string
    password: string
    passwordConfirmation: string
    address: string
}





export interface ILogin{
    email: string
    password: string
}

export interface UserToken{
    expirtyDate: string
    token: string 
    cartId:number
}