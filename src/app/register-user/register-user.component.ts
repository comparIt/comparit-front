import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../shared/models/user';
import {UserRegistrationService} from '../shared/services/user-registration.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  userform: FormGroup;
  firstname: string;
  lastname:string;
  emailId: string;
  password: string;
  user:User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userRegistrationService :UserRegistrationService) 
  {}

  ngOnInit() {
    this.user= new User();
    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'email': new FormControl('', [Validators.required, Validators.email])
    });
  }

  onClickRegisterUser() {
    console.log(this.user)
    this.userRegistrationService.putUserRegistration(this.user);
  }

  onClickGoToLogin() {
    this.router.navigate(['login']);
  }

}
