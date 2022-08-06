import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private InventoryService : InventoryService) { }

  ngOnInit(): void {
    this.InventoryService.getAllInventories().subscribe(data=>console.log(data))
    this.InventoryService.getProductByBrand("Oppo").subscribe(data=>console.log("by brand:: oppo",data))
    this.InventoryService.getProductByCategory("mobile").subscribe(data=>console.log("getProductByCategory::mobiles::",data))
  }

}
