import {Component, OnInit} from '@angular/core';
import {Product} from '../shared/models/product';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {ActivatedRoute, Params} from '@angular/router';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {Model} from '../shared/models/model';
import {FilterMappingService} from '../shared/services/filterMapping.service';
import {ProductPagineDTO} from '../shared/models/productPagineDTO';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  model: Model;
  productPagineDTO: ProductPagineDTO;

  constructor(
    private api: CompareItAPIService,
    private route: ActivatedRoute,
    private conf: GlobalConfigurationService,
    private filterService: FilterMappingService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.model = this.conf.modelByType(params.type);
      this.search();
    });
  }

  search() {
    this.api.getProducts(this.filterService.filterToApi(this.model, undefined, undefined, undefined)).then(
      (productPagineDTO: ProductPagineDTO) => {
        this.productPagineDTO = new ProductPagineDTO(productPagineDTO);
      }
    );
  }

  paginate(event: any) {
    this.productPagineDTO.pageActuelle = event.page;
    this.productPagineDTO.productsPerPage = event.rows;
  }
}
