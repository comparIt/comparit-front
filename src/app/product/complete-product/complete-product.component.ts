import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {ModelProperty} from '../../shared/models/modelProperty';
import {Model} from '../../shared/models/model';
import {Product} from '../../shared/models/product';
import {CompareItAPIService} from '../../shared/services/compareItAPI.service';
import {ActivatedRoute} from '@angular/router';
import {SupplierContact} from '../../shared/models/supplierContact';
import {MatomoService} from '../../shared/services/Matomo.service';

@Component({
  selector: 'app-complete-product',
  templateUrl: './complete-product.component.html'
})
export class CompleteProductComponent implements OnInit {

  @Input() model: Model;
  product: Product;
  properties: {key: ModelProperty, value: string}[];
  id: string;
  contact: SupplierContact;

  constructor(
    private matomoTracker: MatomoService,
    private api: CompareItAPIService,
    private route: ActivatedRoute,
    public conf: GlobalConfigurationService) {
  }

  ngOnInit() {
    this.matomoTracker.trackPageView(this.constructor.name);

    this.route.params.subscribe(params => {
      this.model = this.conf.modelByType(params.type);
      this.id = params.id;

      this.matomoTracker.trackEvent('Product', 'showCompletProduct', this.id);

      this.api.getProductById(this.id).then((p: Product) => {
        this.product = new Product(p);
        this.properties = Object.keys(this.product.properties).map((key: string) => {
          return {key: this.conf.propertyByModelAndName(this.model.technicalName, key), value: this.product.properties[key]};
        });
      });
    });
  }

  get visibleProperties() {
    return this.properties.filter((p: {key: ModelProperty, value: string}) => p.key.activated);
  }

  hitSupplierLink() {
    this.matomoTracker.trackEvent('Product', 'hitSupplierLink', this.id);
  }

}
