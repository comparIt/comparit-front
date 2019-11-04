import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';

@Component({
  selector: 'app-resume-product',
  templateUrl: './resume-product.component.html'
})
export class ResumeProductComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private config: GlobalConfigurationService) { }


  ngOnInit() {


  }

}
