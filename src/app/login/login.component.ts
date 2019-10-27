import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CompareItAPIService} from '../shared/services/compareItAPI.service';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    checkoutForm;

    constructor(
        private formBuilder: FormBuilder,
        private compareItAPIService: CompareItAPIService

    ) {
        this.checkoutForm = this.formBuilder.group({
            login: '',
            pwd: ''
        });
    }

    ngOnInit() {
    }


    onSubmit(loginandpwd) {
      console.warn('Your order has been submitted', loginandpwd);
      this.checkoutForm.reset();
      this.compareItAPIService.authenticate(loginandpwd.login,loginandpwd.pwd).subscribe();
    }
}
