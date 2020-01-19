import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
import CRYPTO from 'crypto-js';
import {MatomoTracker} from 'ngx-matomo';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    checkoutForm;

    constructor(
        private formBuilder: FormBuilder,
        private compareItAPIService: CompareItAPIService,
        private router: Router,
        public auth: AuthenticationService,
        private matomoTracker: MatomoTracker

    ) {
        this.checkoutForm = this.formBuilder.group({
            login: '',
            pwd: ''
        });
    }

    ngOnInit() {
      this.matomoTracker.trackPageView(this.constructor.name);
    }


    onSubmit(loginandpwd) {
      this.checkoutForm.reset();
      if (!this.auth.isAuthenticated()) {
          this.auth.login(loginandpwd.login, CRYPTO.SHA256(loginandpwd.pwd).toString())
              .then(() => {
                  this.router.navigate(['home']);
                  this.matomoTracker.setUserId(loginandpwd.login);
              });
      }
    }

    onClickGoToRegister() {
        this.router.navigate(['register-user']);
    }
}
