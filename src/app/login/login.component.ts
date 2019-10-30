import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentification.service';
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
            login: '',
            pwd: ''
        });
    }

    ngOnInit() {
    }


    onSubmit(loginandpwd) {
      this.checkoutForm.reset();
        if (!this.auth.isAuthenticated()) {
            this.auth.login(loginandpwd.login,loginandpwd.pwd).subscribe(() => {
                this.router.navigate(['app/home']);
            });
        } else {
            this.router.navigate(['app/home']);
        }
    }
}
