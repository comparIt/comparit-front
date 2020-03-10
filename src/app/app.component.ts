import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private matomoInjector: MatomoInjector
  ) {
    this.matomoInjector.init(environment.settings.analyticsUrl, environment.settings.analyticsId);
  }
  title = environment.settings.SiteTitle;
}
