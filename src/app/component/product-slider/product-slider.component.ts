import { Component, Input, OnInit } from '@angular/core';
import { Iinventory } from 'src/app/model/iproduct';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {
  @Input() product_type : string 
  InventoiresP1:Iinventory[];
  InventoiresP2:Iinventory[];
  prevInvetories:Iinventory[];
  goProductPage:string=""


  fetching:boolean;
  constructor(private inventoryService:InventoryService) { 

  }


  ngOnInit(): void {
    this.fetching = true ;
    this.goProductPage=this.product_type;
    this.inventoryService.getProductByCategory(this.product_type).subscribe(res=>{
      this.fetching = false ;
      this.InventoiresP1 = res.data.slice(0,6);
      this.InventoiresP2 = res.data.slice(7,13);
})
    
  }

}
