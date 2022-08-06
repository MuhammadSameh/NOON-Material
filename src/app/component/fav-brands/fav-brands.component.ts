import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/model/Ibrand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-fav-brands',
  templateUrl: './fav-brands.component.html',
  styleUrls: ['./fav-brands.component.css']
})
export class FavBrandsComponent implements OnInit {
allbrands:IBrand[]
  constructor(private brandService : BrandService) {
    this.brandService.getAllBrand().subscribe(br=>this.allbrands = br)
   }

  ngOnInit(): void {
  }
 
}
