import {Component, Input, OnInit, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {ModelProperty} from '../../shared/models/modelProperty';
import {Model} from '../../shared/models/model';
import {Product} from '../../shared/models/product';
import {CompareItAPIService} from '../../shared/services/compareItAPI.service';
import {ActivatedRoute} from '@angular/router';
import {SupplierContact} from '../../shared/models/supplierContact';
import {MatomoService} from '../../shared/services/Matomo.service';
import {Review} from '../../shared/models/review';
import {AuthenticationService} from '../../shared/services/authentification.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-complete-product',
  templateUrl: './complete-product.component.html'
})
export class CompleteProductComponent implements OnInit {

  @Input() model: Model;
  @Output() ratingOutput;
  product: Product;
  properties: {key: ModelProperty, value: string}[];
  id: string;
  contact: SupplierContact;
  productRate: number;
  reviewProduct: Review;
  reviews: Review[] ;
  loadingComments = false;

  constructor(
    private matomoTracker: MatomoService,
    private api: CompareItAPIService,
    private route: ActivatedRoute,
    public conf: GlobalConfigurationService,
    private messageService: MessageService,
    public auth: AuthenticationService) {
  }

  ngOnInit() {
    this.matomoTracker.trackPageView(this.constructor.name);

    this.route.params.subscribe(params => {
      this.model = this.conf.modelByType(params.type);
      this.id = params.id;

      this.matomoTracker.trackEvent('Product', 'showCompletProduct', this.id);

      if (this.auth.isAuthenticated()) {
        this.reviewProduct = new Review({
          userId: this.auth.currentUserValue.id,
          productId: this.id,
          comment: '',
          rate: 0
        });
      }


      this.api.getProductById(this.id)
        .then((p: Product) => {
          this.product = new Product(p);
          this.properties = Object.keys(this.product.properties).map((key: string) => {
            return {key: this.conf.propertyByModelAndName(this.model.technicalName, key), value: this.product.properties[key]};
          });
          return this.getAvg();
        })
        .then(() => this.getReviews());
    });
  }

  getReviews() {
    this.loadingComments = true;
    return this.api.getAllReviewByProductId(this.id).then((reviews: Review[]) => {
      this.reviews = reviews.map(r => new Review(r));
      this.loadingComments = false;
    }).catch(() =>
      this.messageService.add(
        {severity: 'error', summary: 'Erreur', detail: 'Erreur de récupération des commentaires du produit', life: 5000}
      )
    );

  }

  getAvg() {
    return this.api.getAvgByProductId(this.id).then((reviewrate: number) => {
      this.productRate = reviewrate;
    }).catch(() =>
      this.messageService.add(
        {severity: 'error', summary: 'Erreur', detail: 'Erreur de récupération de la note du produit', life: 5000}
        )
    );
  }


  get visibleProperties() {
    return this.properties.filter((p: {key: ModelProperty, value: string}) => p.key.activated);
  }

  hitSupplierLink() {
    this.matomoTracker.trackEvent('Product', 'hitSupplierLink', this.id);
  }


  onRatingSet($event: number) {
    this.reviewProduct.rate = $event.valueOf();
  }

  addReview() {
    this.api.putcreateReview(this.reviewProduct)
      .then(() => this.getReviews())
      .then(() => this.getAvg());
  }
}
