import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/model/Icategory';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  activeCate: any;
  subCates:ICategory[]=[];
  imgs:string[] = [
    "https://k.nooncdn.com/mpcms/EN0003/assets/f26eb01a-96e0-4d95-ab5c-a0a80161bcd7.png",
    "https://k.nooncdn.com/cms/pages/20220721/4262b2474f9b4e2e0408654017d7a964/en_dk_eg-hero-banner-02.gif",
    "https://k.nooncdn.com/cms/pages/20220720/2b8c0e77e0a1b3ad74cb227f2d27f052/en_banner-01.png",
    "https://k.nooncdn.com/cms/pages/20220510/c785f16d3cba227856540d669360c914/en_banner-01.png"
   ]

   activeImg:string=this.imgs[2]
 
  constructor(private activeRoute:ActivatedRoute,private categoryService : CategoriesService, private router:Router) { 
    this.activeRoute.url.subscribe(data=>{
      this.activeCate =  data[1].path
  
      //change backgorund header
      switch(this.activeCate){
        case "Electroics":this.activeImg= this.imgs[0];break;
        case "Fashion": this.activeImg= this.imgs[1];break;
        case "home kitchen":this.activeImg= this.imgs[2];break;
        case "Super market":this.activeImg= this.imgs[3];break;
        default: this.router.navigate(['notfound'])
      }

      this.categoryService.getSubCategoryForParent(this.activeCate).subscribe(data=>{this.subCates=data})

    })

  }
 
  ngOnInit(): void {


  //this.activeCate= this.activeRoute.snapshot.url[0].path.trim()
  this.callApi(this.activeCate)
   }
    callApi(paretCate:string){
      
    }

}


// switch(this.activeCate){
//   case "Electroics": this.callApi("Electroics");break;
//   case "Fashion": this.callApi("Fashion");break;
//   case "home kitchen":this.callApi("home kitchen");break;
//   case "Super market":this.callApi("Super market");break;
// }




// { path: "Electroics", component: CategoriesPageComponent },
// { path: "Fashion", component: CategoriesPageComponent },
// { path: "home kitchen", component: CategoriesPageComponent },
// { path: "Super market", component: CategoriesPageComponent },





// this.path = this.router.url.split('/')[1];
// console.log("using router wayyyy",this.path);