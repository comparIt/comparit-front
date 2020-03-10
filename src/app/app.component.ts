import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private matomoInjector: MatomoInjector
  ) {
    this.matomoInjector.init('https://demo.comparit.fr/analytics/', 1);
  }
  title = 'compare-it-front';
}
