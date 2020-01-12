import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {AuthenticationService} from '../../shared/services/authentification.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',

})
export class FilterComponent implements OnInit {
  user: Observable<User>;
  constructor(
    private authentification: AuthenticationService,
  ) { }

  ngOnInit() {
    this.user = this.authentification.currentUser;
  }

}
