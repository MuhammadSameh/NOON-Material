import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iinventory } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  inventoryDetails:Iinventory;
  quantaty:number[] = [1];
  selectedQuantity:number = 1;
  activeCartId :number ;
  invetoriesPerProduct:Iinventory[] = [];

  ProductId:number=0;


//to be tested
selectedInventory={
  inveId:0, 
  color:"",
  size:"",
  quantity:1,
  medias:[]
}

listOfColor:string[] = []
listOfSizes:string[] = []


//to be tested

  constructor(private activedRotue : ActivatedRoute , private inventoryService:InventoryService , private cartServices:CartService) { 

    this.inventoryDetails = {
      inventoryId: 1,
      productId: 1,
      size: "",
      color: "",
      quantity: 0,
      price: 0,
      product:{ productId:0 , name:"", description:"", category : "", brand : ""},
      medias:[]
  }
    this.activedRotue.paramMap.subscribe(data=>{
     let Iid= Number(data.get('Iid'))
    //right way 
    this.inventoryService.getInventoryById(Iid).subscribe(inve=>{
      this.inventoryDetails = inve; 
      this.ProductId = inve.productId;//get product id  >> get all inventories
      
       this.inventoryService.getInventoriesByProduct(this.ProductId).subscribe(invesPp=>{
         this.invetoriesPerProduct = invesPp
        console.log("invetorrrrrrrrrrrrries",invesPp)
         if(this.invetoriesPerProduct.length==1){
                // this mean no variation 
                this.invetoriesPerProduct[0]= this.inventoryDetails;
                //quantity
                this.SelectQuantity()
                //color
                this.selectedInventory.color = this.inventoryDetails.color;
                //size 
                this.selectedInventory.size = this.inventoryDetails.size;
                //inventory id
                this.selectedInventory.inveId = this.inventoryDetails.inventoryId;
                //select media 
                this.selectedInventory.medias = this.inventoryDetails.medias;

                //colors & sizes
                this.listOfColor[0] = this.inventoryDetails.color
                this.listOfSizes[0]= this.inventoryDetails.size
         }
         else{
               // there is a varation
               for(var i =0 ;i<invesPp.length ; i++){
                let color = invesPp[i].color
                let isExist = false;
                for(let i = 0 ; i < this.listOfColor.length ; i++ ){
                       if(color == this.listOfColor[i]){isExist=true}
                }
                if(!isExist){this.listOfColor.push(color)}}
                console.log(this.listOfColor)
                this.selectedInventory.medias = this.inventoryDetails.medias;
                this.SelectQuantity()
         }         
       })
    })   
    
  })
  }
  ngOnInit(): void {
    this.activeCartId = Number(localStorage.getItem('cartId'));
    

  }
  addToCart(){
  this.cartServices.getCartById(Number(localStorage.getItem('cartId') ) ).subscribe(data=>{
    console.log( "from ccccccart",data)
    let inventoryIsExist= false;
    for(let i = 0 ; i< data.cartItems.length;i++){
           if(data.cartItems[i].inventoryId == this.inventoryDetails.inventoryId){
               inventoryIsExist=true; 
           }
    }
   if(!inventoryIsExist){
      this.cartServices.addToCartS(Number(localStorage.getItem('cartId') ) , this.selectedInventory.inveId , Number(this.selectedQuantity)).subscribe(next=>{
      }
      ,err=>{alert(err)})
      }
  })
}


SelectSize(size:string){
  this.quantaty=[];
    this.selectedInventory.size = size
    
    this.SelectQuantity()
}

SelectColor(color:string){
  this.quantaty=[];
     this.selectedInventory.color = color ; 
     
     // size for this color 
     let tempArr = this.invetoriesPerProduct.filter(data=>data.color ==color)
     this.listOfSizes = tempArr.map(data=>data['size'])
     console.log(this.listOfSizes)
     
     this.selectedInventory.medias= tempArr.map(data=>data['medias'])
  
     console.log(this.selectedInventory)
     //select qunatity
    this.SelectQuantity()
    }

SelectQuantity(){
  // no varity
  if(this.invetoriesPerProduct.length ==1){
    this.quantaty=[]
    for(let i=1;i<=this.inventoryDetails.quantity;i++){
      this.quantaty.push(i)
    } 
  }  
  //varity 
  else{
    if(this.selectedInventory.color !='' && this.selectedInventory.size!=''){
      console.log(this.selectedInventory)
      let tempArr = this.invetoriesPerProduct.filter(data=>data.color == this.selectedInventory.color && data.size == this.selectedInventory.size)
      console.log(tempArr)
      this.selectedInventory.inveId = tempArr[0].inventoryId ; 
      this.selectedInventory.quantity = tempArr[0].quantity;

      for(let i=1;i<=tempArr[0].quantity;i++){
        this.quantaty.push(i)
      }
    }

  }
}
}




















/*

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iinventory } from 'src/app/model/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  inventoryDetails:Iinventory;
  quantaty:number[] = [1];
  selectedQuantity:number = 1;
  activeCartId :number ;
  invetoriesPerProduct:Iinventory[] = [];

  ProductId:number=0;


//to be tested
selectedInventory={
  inveId:0, 
  color:"",
  size:"",
  quantity:1,
}

listOfColor:string[] = []
listOfSizes:string[] = []


//to be tested

  constructor(private activedRotue : ActivatedRoute , private inventoryService:InventoryService , private cartServices:CartService) { 

    this.inventoryDetails = {
      inventoryId: 1,
      productId: 1,
      size: "",
      color: "",
      quantity: 0,
      price: 0,
      product:{ productId:0 , name:"", description:"", category : "", brand : ""},
      medias:[]
  }
    this.activedRotue.paramMap.subscribe(data=>{
     let Iid= Number(data.get('Iid'))
    //right way 
    this.inventoryService.getInventoryById(Iid).subscribe(inve=>{
      this.inventoryDetails = inve; 
      this.ProductId = inve.productId;//get product id  >> get all inventories
      
       this.inventoryService.getInventoriesByProduct(this.ProductId).subscribe(invesPp=>{
         this.invetoriesPerProduct = invesPp
        console.log("invetorrrrrrrrrrrrries",invesPp)
         if(this.invetoriesPerProduct.length==1){
                // this mean no variation 
                this.invetoriesPerProduct[0]= this.inventoryDetails;
                //quantity
                this.SelectQuantity()
                //color
                this.selectedInventory.color = this.inventoryDetails.color;
                //size 
                this.selectedInventory.size = this.inventoryDetails.size;
                //inventory id
                this.selectedInventory.inveId = this.inventoryDetails.inventoryId;

                //colors & sizes
                this.listOfColor[0] = this.inventoryDetails.color
                this.listOfSizes[0]= this.inventoryDetails.size
         }
         else{
               // there is a varation

               for(var i =0 ;i<invesPp.length ; i++){
                let color = invesPp[i].color
                let isExist = false;
                for(let i = 0 ; i < this.listOfColor.length ; i++ ){
                       if(color == this.listOfColor[i]){isExist=true}
                }
                if(!isExist){this.listOfColor.push(color)}}
                console.log(this.listOfColor)
                this.SelectQuantity()
         }         
       })
    })   
    
  })
  }
  ngOnInit(): void {
    this.activeCartId = Number(localStorage.getItem('cartId'));
    

  }
  addToCart(){
  this.cartServices.getCartById(Number(localStorage.getItem('cartId') ) ).subscribe(data=>{
    console.log( "from ccccccart",data)
    let inventoryIsExist= false;
    for(let i = 0 ; i< data.cartItems.length;i++){
           if(data.cartItems[i].inventoryId == this.inventoryDetails.inventoryId){
               inventoryIsExist=true; 
           }
    }
   if(!inventoryIsExist){
      this.cartServices.addToCartS(Number(localStorage.getItem('cartId') ) , this.selectedInventory.inveId , Number(this.selectedQuantity)).subscribe(next=>{
      }
      ,err=>{alert(err)})
      }
  })
}


SelectSize(size:string){
  this.quantaty=[];
    this.selectedInventory.size = size
    
    this.SelectQuantity()
}

SelectColor(color:string){
  this.quantaty=[];
     this.selectedInventory.color = color

     // size for this color 
      let tempArr = this.invetoriesPerProduct.filter(data=>data.color ==color)
      this.listOfSizes = tempArr.map(data=>data['size'])
        console.log(this.listOfSizes)
     //select qunatity
    this.SelectQuantity()
    }

SelectQuantity(){
  // no varity
  if(this.invetoriesPerProduct.length ==1){
    this.quantaty=[]
    for(let i=1;i<=this.inventoryDetails.quantity;i++){
      this.quantaty.push(i)
    } 
  }  
  //varity 
  else{
    if(this.selectedInventory.color !='' && this.selectedInventory.size!=''){
      console.log(this.selectedInventory)
      let tempArr = this.invetoriesPerProduct.filter(data=>data.color == this.selectedInventory.color && data.size == this.selectedInventory.size)
      console.log(tempArr)
      this.selectedInventory.inveId = tempArr[0].inventoryId ; 
      this.selectedInventory.quantity = tempArr[0].quantity;

      for(let i=1;i<=tempArr[0].quantity;i++){
        this.quantaty.push(i)
      }
    }

  }
}
}




*/