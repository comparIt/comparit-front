import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public config: GlobalConfigurationService, private router: Router) {

  }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToAdmin() {
    this.router.navigate(['/app/admin/1']);
  }

}
