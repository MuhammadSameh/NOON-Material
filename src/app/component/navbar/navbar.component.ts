import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loadder/loader.service';
import { ICategory } from 'src/app/model/Icategory';
import { ISubCategoires } from 'src/app/model/Isub-categoires';
import { UserToken } from 'src/app/model/user';
import { BrandService } from 'src/app/services/brand.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {IBrand} from '../../model/Ibrand'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit ,OnDestroy {
  mainOpend:Boolean =  false;
  subOpend:Boolean =  false; 

  activeCateNum:number = 1 ; // default
  activeCateName:string = "Electronics";
  activeSubCateNum:number = 1; // default
  activeSubCateName:string;


  allCategories : ICategory[] =[];
  parentCategories : ICategory[]=[]
  SubCategories : ICategory[]=[]
  brand:IBrand[]=[];


  activeBrand: IBrand[] =[]

  /*navbar user*/
  isLogged:boolean;

  activeCart :number = 0

  userLogin:UserToken

  //login token + cart id local storage
  constructor(private categoreisServices:CategoriesService , private brandService : BrandService,private router:Router, public loaderServices:LoaderService) { 
    // api/allcategories
    this.categoreisServices.getAllCategories().subscribe((next)=>{
      this.allCategories = next ;
      this.SubCategories = next.filter(cate=>cate.parentId != null && cate.categoryId>=9 && cate.categoryId<=11)
      this.SubCategories.push(next[3])
      this.SubCategories.push(next[4])
    },(error)=>{})
    //api/parentcategories
    this.categoreisServices.getParentCategoreis().subscribe((next)=>{this.parentCategories=next},(error)=>{alert(error)})    
    //api/brand
    this.brandService.getAllBrand().subscribe(data=> this.brand = data)
  
   
    
 
  
  
  }
  ngOnDestroy(): void {
      this.isLogged = false;
      localStorage.clear();

    }

  ngOnInit(): void {
    // this.isLogged = Number(localStorage.getItem("cartId")) == 0 ? false : true;
    // this.activeCart = 0;
    // this.isLogged = false 
    localStorage.clear();
    console.log(localStorage.getItem('cartId'))

  }


  // hover on main category button 
  openMainCate(){
    this.mainOpend = true; 
    this.subOpend = false;
  }
    // leave on main category button 
    closeMainCate(){
    this.mainOpend=false;
  }


  openSubCate(){
    this.subOpend =  true;
    this.mainOpend=false; 
    

  }
  closeSubCate(){
    this.subOpend =  false;
    this.mainOpend=false; 
  }


  /* 
  active sub Category 
  know that  - SubCateName
             - subCateId
  */

  activatedCate(activeName:string,activeId:number){
    // this.activeCateNum = ac
    // this.activeCateName =  this.allCategories.filter(cat=>cat.categoryId == ac)[0].name
    this.activeCateName = activeName ; 
    this.activeCateNum = activeId;
    this.categoreisServices.getTopBrandForCategory(activeId).subscribe(brands=>this.activeBrand =brands)
  }

  /* 
  active sub Category 
  know that  - SubCateName
             - subCateId
  */
  activatedSubCates(activeName:string , activeId:number){
    //this.activeSubCateNum =asub;
    //this.activeSubCateName =  this.allCategories.filter(cat=>cat.categoryId == asub)[0].name
  
    this.activeSubCateName = activeName ;
    this.activeSubCateNum = activeId;


    this.categoreisServices.getTopBrandForCategory(activeId).subscribe(brands=>{
    this.activeBrand =brands
    },err=>{
    }
    )
}


UserLoggedIn(eve : UserToken){
  this.userLogin = {
    token : eve.token ,
    cartId:eve.cartId,
    expirtyDate:eve.expirtyDate
  }
  this.activeCart = this.userLogin.cartId;
  this.isLogged = true;
  this.router.navigate(['home'])
}


logout(){
  localStorage.clear();
  this.activeCart = 0;
  this.isLogged = false
  this.router.navigate(['home'])
  console.log(localStorage.getItem('cartId'))
}

}














/*


import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loadder/loader.service';
import { ICategory } from 'src/app/model/Icategory';
import { ISubCategoires } from 'src/app/model/Isub-categoires';
import { UserToken } from 'src/app/model/user';
import { BrandService } from 'src/app/services/brand.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {IBrand} from '../../model/Ibrand'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  mainOpend:Boolean =  false;
  subOpend:Boolean =  false; 

  activeCateNum:number = 1 ; // default
  activeCateName:string = "Electronics";
  activeSubCateNum:number = 1; // default
  activeSubCateName:string;


  allCategories : ICategory[] =[];
  parentCategories : ICategory[]=[]
  SubCategories : ICategory[]=[]
  brand:IBrand[]=[];


  activeBrand: IBrand[] =[]


  isLogged:boolean;

  activeCart :number = 0

  userLogin:UserToken

  //login token + cart id local storage
  constructor(private categoreisServices:CategoriesService , private brandService : BrandService,private router:Router, public loaderServices:LoaderService) { 
    // api/allcategories
    this.categoreisServices.getAllCategories().subscribe((next)=>{
      this.allCategories = next ;
      this.SubCategories = next.filter(cate=>cate.parentId != null && cate.categoryId>=9 && cate.categoryId<=11)
      this.SubCategories.push(next[3])
      this.SubCategories.push(next[4])
    },(error)=>{})
    //api/parentcategories
    this.categoreisServices.getParentCategoreis().subscribe((next)=>{this.parentCategories=next},(error)=>{alert(error)})    
    //api/brand
    this.brandService.getAllBrand().subscribe(data=> this.brand = data)
  
   
    
 
  
  
  }

  ngOnInit(): void {
    this.isLogged = Number(localStorage.getItem("cartId")) == 0 ? false : true;
  }


  // hover on main category button 
  openMainCate(){
    this.mainOpend = true; 
    this.subOpend = false;
  }
    // leave on main category button 
    closeMainCate(){
    this.mainOpend=false;
  }


  openSubCate(){
    this.subOpend =  true;
    this.mainOpend=false; 
    

  }
  closeSubCate(){
    this.subOpend =  false;
    this.mainOpend=false; 
  }



  activatedCate(activeName:string,activeId:number){
    // this.activeCateNum = ac
    // this.activeCateName =  this.allCategories.filter(cat=>cat.categoryId == ac)[0].name
    this.activeCateName = activeName ; 
    this.activeCateNum = activeId;
    this.categoreisServices.getTopBrandForCategory(activeId).subscribe(brands=>this.activeBrand =brands)
  }


  activatedSubCates(activeName:string , activeId:number){
    //this.activeSubCateNum =asub;
    //this.activeSubCateName =  this.allCategories.filter(cat=>cat.categoryId == asub)[0].name
  
    this.activeSubCateName = activeName ;
    this.activeSubCateNum = activeId;


    this.categoreisServices.getTopBrandForCategory(activeId).subscribe(brands=>{
    this.activeBrand =brands
    },err=>{
    }
    )
}


UserLoggedIn(eve : UserToken){
  this.userLogin = {
    token : eve.token ,
    cartId:eve.cartId,
    expirtyDate:eve.expirtyDate
  }
  this.activeCart = this.userLogin.cartId;
  this.isLogged = true;
  this.router.navigate(['home'])
}


logout(){
  localStorage.clear();
  this.activeCart = 0;
  this.isLogged = false
  this.router.navigate(['home'])
  
}

}






*/