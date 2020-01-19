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
    this.matomoInjector.init('https://compit.northeurope.cloudapp.azure.com/', 2);
  }
  title = 'compare-it-front';
}
