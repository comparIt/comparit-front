import { Component, OnInit } from '@angular/core';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
import {NgxHotjarService} from 'ngx-hotjar';
import {MatomoTracker} from 'ngx-matomo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private compareItAPIService: CompareItAPIService,
      private router: Router,
      public auth: AuthenticationService,
      protected $hotjar: NgxHotjarService,
      private matomoTracker: MatomoTracker
  ) {
  }

  ngOnInit() {
    this.$hotjar.virtualPageView('/home');
    this.matomoTracker.setDocumentTitle('ngx-Matomo home');
  }




}
