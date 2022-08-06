import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CategoriesPageComponent } from './component/categories-page/categories-page.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { HomeComponent } from './component/home/home.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { ProductsPageComponent } from './component/products-page/products-page.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AuthGuard } from './Guard/auth-guard.guard';



const routes: Routes = [
  {path:"",component:MainLayoutComponent,children:[
      {path:"home",component:HomeComponent},
      {path:"category/:catname",component:CategoriesPageComponent,pathMatch:'full'},
      {path:"productcategory/:productcatename?/:page?",component:ProductsPageComponent},
      {path:"categorybrand/:brandname?/:page?" ,component: ProductsPageComponent },
      {path:'cart/:cartId',component:CartComponent , canActivate:[AuthGuard]},
      {path:"profile",component:UserProfileComponent},
      {path:"product-details/:Iid",component:ProductDetailsComponent},
      {path:'notfound',component:ErrorPageComponent},
      {path:'**',component:ErrorPageComponent}
  ]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }






/*

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesPageComponent } from './component/categories-page/categories-page.component';
import { ErrorPageComponent } from './component/error-page/error-page.component';
import { HomeComponent } from './component/home/home.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { ProductsPageComponent } from './component/products-page/products-page.component';



const routes: Routes = [
  {path:"",component:MainLayoutComponent,children:[
    { path:"",component:HomeComponent},
    { path: "home", component: HomeComponent },
    { path: "Electroics", component: CategoriesPageComponent },
    { path: "Fashion", component: CategoriesPageComponent },
    { path: "home kitchen", component: CategoriesPageComponent },
    { path: "Super market", component: CategoriesPageComponent },
    { path:"Mobile/:page?",component:ProductsPageComponent},
    { path:"Tv/:page?",component:ProductsPageComponent},
    { path:"Smart Watch/:page?",component:ProductsPageComponent},
    { path:"labtop/:page?",component:ProductsPageComponent},
    { path:"Men/:page?",component:ProductsPageComponent},
    { path:"Women/:page?",component:ProductsPageComponent},
    { path:"Child/:page?",component:ProductsPageComponent},
    { path:"Home Appliance/:page?",component:ProductsPageComponent},
    { path:"Furneture/:page?",component:ProductsPageComponent},
    { path:"Cleaning/:page?",component:ProductsPageComponent},
    { path:"cooking/:page?",component:ProductsPageComponent},
    { path:"Boys/:page?",component:ProductsPageComponent},
    { path:"Girls/:page?",component:ProductsPageComponent},
    { path:"Glasses/:page?",component:ProductsPageComponent},
    { path:"Watches/:page?",component:ProductsPageComponent},
  ]},
  {path:"",component:MainLayoutComponent,children:[
    {path:'**',component:ErrorPageComponent}
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }















*/










