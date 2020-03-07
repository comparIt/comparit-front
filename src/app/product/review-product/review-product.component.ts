import {Component, Input, OnInit} from '@angular/core';
import {CompareItAPIService} from '../../shared/services/compareItAPI.service';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {AuthenticationService} from '../../shared/services/authentification.service';
import {User} from '../../shared/models/user';
import {Review} from '../../shared/models/review';

@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html'
})
export class ReviewProductComponent implements OnInit {

  @Input() review: Review;
  colorReview: any;
  user: User;

  constructor(
    public conf: GlobalConfigurationService,
    private auth: AuthenticationService,
    private api: CompareItAPIService
  ) { }

  ngOnInit() {
    this.colorReview = this.conf.colorPrimary;
    this.api.getUserById(this.review.userId).then((user: User) => this.user = User.buildUser(user));
  }

}
