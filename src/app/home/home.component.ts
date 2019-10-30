import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private compareItAPIService: CompareItAPIService,
      private router: Router,
      public auth: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.compareItAPIService.getWebsiteConfiguration().then((result) => {
      alert('Voici la configuration : ' + result.toString());
    });
  }




}
