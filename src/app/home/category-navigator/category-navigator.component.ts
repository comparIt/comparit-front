import {Component, Input, OnInit} from '@angular/core';
import {GlobalConfigurationService} from '../../shared/services/globalConfiguration.service';
import {Router} from '@angular/router';

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


}
