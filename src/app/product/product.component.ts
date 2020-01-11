import {Component, OnInit} from '@angular/core';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {ActivatedRoute} from '@angular/router';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {Model} from '../shared/models/model';
import {FilterMappingService} from '../shared/services/filterMapping.service';
import {ProductPagineDTO} from '../shared/models/productPagineDTO';
import {MessageService} from "primeng/api";
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
    private filterService: FilterMappingService,
    private messageService: MessageService) {
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
    ).catch(() => {
        this.productPagineDTO = new ProductPagineDTO({});
      }
    );
  }

  saveFilter(event) {
    this.api.createFilter(this.filterService.filterToSavedFilter(this.model, event.order, event.alert))
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Filtre', detail: 'Enregistrement réussi', life: 500});
      }).catch(() => {
        this.messageService.add({severity: 'error', summary: 'Filtre', detail: 'Echec de l\'enregirstrement', life: 500});
      }
    );
  }

  paginate(event: any) {
    this.productPagineDTO.pageActuelle = event.page;
    this.productPagineDTO.productsPerPage = event.rows;
  }
}
