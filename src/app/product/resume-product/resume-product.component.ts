import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {Router} from '@angular/router';
import {Model} from '../../shared/models/model';
import {NgxHotjarService} from 'ngx-hotjar';
import {MatomoTracker} from 'ngx-matomo';

@Component({
  selector: 'app-resume-product',
  templateUrl: './resume-product.component.html'
})
export class ResumeProductComponent implements OnInit {

  @Input() product: Product;
  @Input() model: Model;

  constructor(
    protected $hotjar: NgxHotjarService,
    private matomoTracker: MatomoTracker,
    private router: Router,
    private config: GlobalConfigurationService) { }


  ngOnInit() {
    this.$hotjar.virtualPageView('/products/one');
    this.matomoTracker.trackPageView(this.constructor.name);
  }


  goToProduct(idProduct: string) {

    this.router.navigate(['/products/' + this.model.technicalName + '/' + idProduct]);
    // Analytics Tracking
    this.matomoTracker.trackEvent('Product',  'goToProduct', idProduct );
  }

}
