import {Component, OnInit} from '@angular/core';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {ActivatedRoute} from '@angular/router';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {Model} from '../shared/models/model';
import {FilterMappingService} from '../shared/services/filterMapping.service';
import {ProductPagineDTO} from '../shared/models/productPagineDTO';
import {NgxHotjarService} from 'ngx-hotjar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  model: Model;
  productPagineDTO: ProductPagineDTO = new ProductPagineDTO({});

  constructor(
    protected $hotjar: NgxHotjarService,
    private api: CompareItAPIService,
    private route: ActivatedRoute,
    private conf: GlobalConfigurationService,
    private filterService: FilterMappingService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.model = this.conf.modelByType(params.type);
      this.search({});
    });
    this.$hotjar.virtualPageView('/product');
  }

  search(event) {
    this.productPagineDTO = new ProductPagineDTO({});
    this.api.getProducts(this.filterService.filterToApi(this.model, event.order, undefined, undefined)).then(
      (productPagineDTO: ProductPagineDTO) => {
        this.productPagineDTO = new ProductPagineDTO(productPagineDTO);
      }
    ).catch( () => {
        this.productPagineDTO = new ProductPagineDTO({});
      }
    );
  }

  paginate(event: any) {
    this.productPagineDTO.pageActuelle = event.page;
    this.productPagineDTO.productsPerPage = event.rows;
  }
}
