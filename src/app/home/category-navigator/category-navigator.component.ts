import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {Router} from '@angular/router';
import {Model} from "../../shared/models/model";

@Component({
  selector: 'app-category-navigator',
  templateUrl: './category-navigator.component.html'
})
export class CategoryNavigatorComponent implements OnInit {

  constructor(public config: GlobalConfigurationService, private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(type: string) {
    this.router.navigate(['/products/' + type]);
  }

  filterableProducts() {
    return this.config.models.filter((m: Model) => m.activated);
  }


}
