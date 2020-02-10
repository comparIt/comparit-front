import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {Router} from '@angular/router';
import {Model} from '../../shared/models/model';
import {NgxHotjarService} from 'ngx-hotjar';
import {MatomoService} from "../../shared/services/Matomo.service";
import {ModelProperty} from '../../shared/models/modelProperty';

@Component({
  selector: 'app-resume-product',
  templateUrl: './resume-product.component.html'
})
export class ResumeProductComponent implements OnInit {

  @Input() product: Product;
  @Input() model: Model;
  properties: {key: ModelProperty, value: string}[];

  constructor(
    protected $hotjar: NgxHotjarService,
    private matomoTracker: MatomoService,
    private router: Router,
    private config: GlobalConfigurationService) { }


  ngOnInit() {
    this.$hotjar.virtualPageView('/products/one');
    this.matomoTracker.trackPageView(this.constructor.name);
    this.properties = Object.keys(this.product.properties).map((key: string) => {
      return {key: this.config.propertyByModelAndName(this.model.technicalName, key), value: this.product.properties[key]};
    });
  }


  goToProduct(idProduct: string) {
    this.router.navigate(['/products/' + this.model.technicalName + '/' + idProduct]);
    // Analytics Tracking
    this.matomoTracker.trackEvent('Product',  'goToProduct', idProduct );
  }

  get visibleProperties() {
    return this.properties.filter((p: {key: ModelProperty, value: string}) => p.key.activated);
  }
}
