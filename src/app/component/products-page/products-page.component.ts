import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loadder/loader.service';
import { Ifilteration } from 'src/app/model/ifilteration';
import { Iinventory, Iproduct, IResponse } from 'src/app/model/iproduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { IBrand } from "../../model/Ibrand";


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  categoryName:string =""; 
  categoryId:number=1;
  pageIndex:number=1;
  totalPages:number=1;
  pPerPage:number=20
  pPerPrice:boolean = false

  totalPagesArr:number[]=[];
  totalBrand: IBrand[];
  GoBrandGoProduct : string = "";

  response: IResponse;


  //filteration 
  filteration:Ifilteration


  //loading
  fetching:boolean = true;

  constructor(private activeRoute:ActivatedRoute, private inventoryServices:InventoryService,private router:Router, private categoryService:CategoriesService,public loaderServices:LoaderService) {
                this.filteration={
                  minPrice:null, 
                  maxPrice:null, 
                  color:"", 
                  brand:null
                }

                //increase performance

              this.activeRoute.url.subscribe(data=>{
                this.fetching = true
              this.GoBrandGoProduct = data[0].path;
              this.categoryName = data[1].path;
              this.pageIndex = Number(data[2].path);
              
              if(this.GoBrandGoProduct =='productcategory'){
                this.categoryService.getAllCategories().subscribe(data=>{
                  this.categoryId = data.filter(ele=>ele.name == this.categoryName)[0].categoryId;
                      this.categoryService.getTopBrandForCategory(this.categoryId).subscribe(bra=>this.totalBrand=bra)
                    }) 
                    this.getInventory();

        }

        if(this.GoBrandGoProduct =='categorybrand'){
            this.getinventoryByBrand();
      }
    })
    }
  ngOnInit(): void {
    this.fetching = true
  }
  getInventory(sortBy:boolean = this.pPerPrice , prodPerPage:number = this.pPerPage){
    this.inventoryServices.getProductByCategory(this.categoryName ,sortBy ,prodPerPage,this.pageIndex).subscribe(res=>{
      this.response = res ;
      this.fetching = false
      console.log("performaceeeeeeeee",res)
      let { totalPages ,pageIndex } = res ; 
      this.totalPages=totalPages;
      this.pageIndex =pageIndex;
      this.totalPagesArr=[];
      for(let i = 1 ; i<=this.totalPages ; i++){
        this.totalPagesArr.push(i)
      }
    })
  }

getinventoryByBrand(sortBy:boolean = this.pPerPrice , prodPerPage:number = this.pPerPage){
  this.inventoryServices.getProductByBrand(this.categoryName ,sortBy ,this.pageIndex,prodPerPage).subscribe(res=>{
    this.fetching= false
    this.response = res ;
    let { totalPages ,pageIndex } = res ; 
    this.totalPages=totalPages;
    this.pageIndex =pageIndex;
    this.totalPagesArr=[];
    for(let i = 1 ; i<=this.totalPages ; i++){
      this.totalPagesArr.push(i)
    }
})
}

  nextPage(){
    this.pageIndex == this.pageIndex++ ;
   if(this.GoBrandGoProduct == 'productcategory'){this.router.navigate(['productcategory',this.categoryName,this.pageIndex])}
   if(this.GoBrandGoProduct == 'categorybrand'){this.router.navigate(['categorybrand',this.categoryName,this.pageIndex])}
  }
  prevPage(){
    this.pageIndex == this.pageIndex-- ;
    if(this.GoBrandGoProduct == 'productcategory'){this.router.navigate(['productcategory',this.categoryName,this.pageIndex])}
    if(this.GoBrandGoProduct == 'categorybrand'){this.router.navigate(['categorybrand',this.categoryName,this.pageIndex])}
  }

  nextPageFiltertion(){
    this.pageIndex == this.pageIndex++ ;
    this.changeFilteration()
  }

  prevPageFiltertion(){
    this.pageIndex == this.pageIndex-- ;
    this.changeFilteration()
  }


  changeColor(col :string){
     this.filteration.color = col;
     this.changeFilteration()
     console.log(this.filteration)
  }


changePageIndexForFilteration(pageIndex:number){
  this.pageIndex = pageIndex;
  this.changeFilteration()
}

  changeFilteration(){ 
    //first page
    this.inventoryServices.getFilteredPorducts( this.filteration , this.pPerPrice ,this.categoryName ,this.pPerPage,this.pageIndex )
    .subscribe(res=>{
      this.fetching= false
                    this.response = res ;
                  let { totalPages ,pageIndex } = res ; 
                  this.totalPages=totalPages;
                  this.pageIndex =pageIndex;
                  this.totalPagesArr=[];
                  for(let i = 1 ; i<=this.totalPages ; i++){
                    this.totalPagesArr.push(i)
                  }}
               )


  }

  test(){
    console.log(this.filteration)
 }

  productPerPage(pNo:number){
    if(this.GoBrandGoProduct =='productcategory'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
      this.getInventory(this.pPerPrice , pNo )
      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
    if(this.GoBrandGoProduct =='categorybrand'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
      this.getinventoryByBrand(this.pPerPrice , pNo )

            //test to be deleted
            this.changeFilteration()
            //test to be deleted

    }
  
    this.pPerPage = pNo;
    this.changeFilteration()
  }
  productPerPrice(sortBy : any){
    if(this.GoBrandGoProduct =='productcategory'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
           this.getInventory(sortBy , this.pPerPage)

      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
    if(this.GoBrandGoProduct =='categorybrand'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
           this.getinventoryByBrand(sortBy , this.pPerPage)

      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
     this.pPerPrice = sortBy;
    }


}





















/*



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/loadder/loader.service';
import { Ifilteration } from 'src/app/model/ifilteration';
import { Iinventory, Iproduct, IResponse } from 'src/app/model/iproduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { IBrand } from "../../model/Ibrand";


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  categoryName:string =""; 
  categoryId:number=1;
  pageIndex:number=1;
  totalPages:number=1;
  pPerPage:number=20
  pPerPrice:boolean = false

  totalPagesArr:number[]=[];
  totalBrand: IBrand[];
  GoBrandGoProduct : string = "";

  response: IResponse;


  //filteration 
  filteration:Ifilteration


  //loading
  fetching:boolean = true;

  constructor(private activeRoute:ActivatedRoute, private inventoryServices:InventoryService,private router:Router, private categoryService:CategoriesService,public loaderServices:LoaderService) {
                this.filteration={
                  minPrice:null, 
                  maxPrice:null, 
                  color:"", 
                  brand:null
                }

                //increase performance

              this.activeRoute.url.subscribe(data=>{
              this.GoBrandGoProduct = data[0].path;
              this.categoryName = data[1].path;
              this.pageIndex = Number(data[2].path);
              
              if(this.GoBrandGoProduct =='productcategory'){
                this.categoryService.getAllCategories().subscribe(data=>{
                  this.categoryId = data.filter(ele=>ele.name == this.categoryName)[0].categoryId;
                      this.categoryService.getTopBrandForCategory(this.categoryId).subscribe(bra=>this.totalBrand=bra)
                    }) 
                    this.getInventory();

        }

        if(this.GoBrandGoProduct =='categorybrand'){
            this.getinventoryByBrand();
      }
    })
    }
  ngOnInit(): void {
 
  }
  getInventory(sortBy:boolean = this.pPerPrice , prodPerPage:number = this.pPerPage){
    this.inventoryServices.getProductByCategory(this.categoryName ,sortBy ,prodPerPage,this.pageIndex).subscribe(res=>{
      this.response = res ;
      console.log("performaceeeeeeeee",res)
      let { totalPages ,pageIndex } = res ; 
      this.totalPages=totalPages;
      this.pageIndex =pageIndex;
      this.totalPagesArr=[];
      for(let i = 1 ; i<=this.totalPages ; i++){
        this.totalPagesArr.push(i)
      }
    })
  }

getinventoryByBrand(sortBy:boolean = this.pPerPrice , prodPerPage:number = this.pPerPage){
  this.inventoryServices.getProductByBrand(this.categoryName ,sortBy ,this.pageIndex,prodPerPage).subscribe(res=>{
    this.fetching= false
    this.response = res ;
    let { totalPages ,pageIndex } = res ; 
    this.totalPages=totalPages;
    this.pageIndex =pageIndex;
    this.totalPagesArr=[];
    for(let i = 1 ; i<=this.totalPages ; i++){
      this.totalPagesArr.push(i)
    }
})
}

  nextPage(){
    this.pageIndex == this.pageIndex++ ;
   if(this.GoBrandGoProduct == 'productcategory'){this.router.navigate(['productcategory',this.categoryName,this.pageIndex])}
   if(this.GoBrandGoProduct == 'categorybrand'){this.router.navigate(['categorybrand',this.categoryName,this.pageIndex])}
  }
  prevPage(){
    this.pageIndex == this.pageIndex-- ;
    if(this.GoBrandGoProduct == 'productcategory'){this.router.navigate(['productcategory',this.categoryName,this.pageIndex])}
    if(this.GoBrandGoProduct == 'categorybrand'){this.router.navigate(['categorybrand',this.categoryName,this.pageIndex])}
  }


  changeColor(col :string){
     this.filteration.color = col;
     this.changeFilteration()
  }
  changeFilteration(){ 
    this.inventoryServices.getFilteredPorducts( this.filteration , this.pPerPrice ,this.categoryName ,this.pPerPage,this.pageIndex )
    .subscribe(res=>{
                console.log("from filterationnnnnnn",res)
                    this.response = res ;
                  let { totalPages ,pageIndex } = res ; 
                  this.totalPages=totalPages;
                  this.pageIndex =pageIndex;
                  this.totalPagesArr=[];
                  for(let i = 1 ; i<=this.totalPages ; i++){
                    this.totalPagesArr.push(i)
                  }}
               )


  }

  test(){
    console.log(this.filteration)
 }

  productPerPage(pNo:number){
    if(this.GoBrandGoProduct =='productcategory'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
      this.getInventory(this.pPerPrice , pNo )
      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
    if(this.GoBrandGoProduct =='categorybrand'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
      this.getinventoryByBrand(this.pPerPrice , pNo )

            //test to be deleted
            this.changeFilteration()
            //test to be deleted

    }
  
    this.pPerPage = pNo;
    this.changeFilteration()
  }
  productPerPrice(sortBy : boolean){
    if(this.GoBrandGoProduct =='productcategory'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
           this.getInventory(sortBy , this.pPerPage)

      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
    if(this.GoBrandGoProduct =='categorybrand'){
      this.router.navigate([this.GoBrandGoProduct,this.categoryName,1])
           this.getinventoryByBrand(sortBy , this.pPerPage)

      //test to be deleted
      this.changeFilteration()
      //test to be deleted
    }
     this.pPerPrice = sortBy;
    }


}












*/