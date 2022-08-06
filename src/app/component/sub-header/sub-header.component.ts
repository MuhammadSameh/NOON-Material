import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/model/Icategory';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  subCateSlid1:ICategory[];
  subCateSlid2:ICategory[];
  
  constructor(private categoryService:CategoriesService) { 
    this.categoryService.getAllCategories().subscribe(data=>{
      this.subCateSlid1 = data.filter(ele=>ele.parentCategory !=null).slice(0,6)
      this.subCateSlid2 = data.filter(ele=>ele.parentCategory !=null).slice(6,12)
    })
  }
  ngOnInit(): void {}


}
