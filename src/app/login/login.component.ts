import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormControl, FormGroup} from '@angular/forms';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
import CRYPTO from 'crypto-js';
import {tokenize} from '@angular/compiler/src/ml_parser/lexer';



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
        public auth: AuthenticationService

    ) {
        this.checkoutForm = this.formBuilder.group({
            login: new FormControl('', [Validators.required, Validators.email]),
            pwd: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
        });
    }

    ngOnInit() {
    }


    onSubmit(loginandpwd) {
      this.checkoutForm.reset();
      if (!this.auth.isAuthenticated()) {
          this.auth.login(loginandpwd.login, CRYPTO.SHA256(loginandpwd.pwd).toString())
              .then(() => {
                  this.router.navigate(['home']);
              });
      }
    }

    onClickGoToRegister() {
        this.router.navigate(['register-user']);
    }
}
