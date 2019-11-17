import { Component, OnInit } from '@angular/core';
import {Product} from '../shared/models/product';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private api: CompareItAPIService, private route: ActivatedRoute) { }

  products: Product[];

  ngOnInit() {
    this.api.getMockProduct()
      .then((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });

  }

}
