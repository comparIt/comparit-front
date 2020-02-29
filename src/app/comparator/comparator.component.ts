import {Component, OnInit} from '@angular/core';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {MatomoService} from '../shared/services/Matomo.service';
import {Model} from '../shared/models/model';
import {Product} from '../shared/models/product';
import {ModelProperty} from '../shared/models/modelProperty';
import {Location} from '@angular/common';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html'
})
export class ComparatorComponent implements OnInit {


  model: Model;
  products: Product[] = [];

  constructor(
    private api: CompareItAPIService,
    private router: Router,
    private route: ActivatedRoute,
    private matomoTracker: MatomoService,
    public conf: GlobalConfigurationService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.matomoTracker.trackPageView(this.constructor.name);
    this.route.params.subscribe(params => {
      this.model = this.conf.modelByType(params.type);
      this.fetchProducts();
    });
  }

  fetchProducts() {
    this.route.queryParamMap.subscribe(queryParams => {
      queryParams.keys.map(key => queryParams.get(key)).forEach((value: string) => {
        this.api.getProductById(value).then((p: Product) => {
          this.products.push(new Product(p));
        });
      });
    });
  }

  get visibleProperties() {
    return this.model.modelProperties
      .filter((p: ModelProperty) => p.activated && p.technicalName !== 'name' && p.technicalName !== 'price');
  }

  back() {
    this.location.back();
  }

  goToProduct(idProduct: string) {
    this.router.navigate(['/products/' + this.model.technicalName + '/' + idProduct]);
    // Analytics Tracking
    this.matomoTracker.trackEvent('Product',  'goToProductFromComparator', idProduct );
  }

}
