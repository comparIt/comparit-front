import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private api: CompareItAPIService) { }

  products: Product[];

  ngOnInit() {
    this.api.getMockProduct().then((products: Product[]) => {
      this.products = products;
      console.log(this.products);
      this.products.forEach(product => console.log(product.properties));
    });

  }

}
