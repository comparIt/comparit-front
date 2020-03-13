import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentification.service';
import {User} from '../../models/user';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
      public config: GlobalConfigurationService,
      private auth: AuthenticationService) {

  }

  get apiURL() {
    return environment.settings.apiUrl + '/swagger-ui.html';
  }

  ngOnInit(): void {
  }

}
