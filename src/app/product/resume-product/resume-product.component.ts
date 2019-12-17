import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {Router} from '@angular/router';
import {Model} from '../../shared/models/model';

@Component({
  selector: 'app-resume-product',
  templateUrl: './resume-product.component.html'
})
export class ResumeProductComponent implements OnInit {

  @Input() product: Product;
  @Input() model: Model;

  constructor(
    private router: Router,
    private config: GlobalConfigurationService) { }


  ngOnInit() {


  }


  goToProduct(idProduct: string) {

    this.router.navigate(['/products/' + this.model.technicalName + '/' + idProduct]);
  }

}
