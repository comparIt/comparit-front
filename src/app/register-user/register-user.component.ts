import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {User} from '../shared/models/user';
import {UserRegistrationService} from '../shared/services/user-registration.service';
import {GlobalConfigurationService} from '../shared/services/globalConfiguration.service';
import {MessageService} from 'primeng/api';
import CRYPTO from 'crypto-js';
import {AuthenticationService} from '../shared/services/authentification.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html'
})

export class RegisterUserComponent implements OnInit {

  userform: FormGroup;
  firstname: string;
  lastname: string;
  emailId: string;
  password: string;
  confirmedPassword: string;
  user: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userRegistrationService: UserRegistrationService,
    private messageService: MessageService,
    public auth: AuthenticationService,
    public config: GlobalConfigurationService) {
  }

  ngOnInit() {
    this.user = new User();
    this.userform = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmedPassword: new FormControl('', Validators.required)
    }, {
      validator: this.checkPasswords
    });
  }

  onClickRegisterUser() {
    this.userRegistrationService.putUserRegistration(this.user)
      .catch(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Echec',
          detail: 'Erreur lors de la création de votre compte',
          life: 2000
        });
      })
      .then(() => {
        this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Compte créé', life: 2000});
        return this.auth.login(this.user.email, CRYPTO.SHA256(this.user.password).toString());
      })
      .then(() => {
        this.router.navigate(['home']);
      });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmedPassword').value;

    return pass === confirmPass ? false : {notSame: true};
  }

  onClickGoToLogin() {
    this.router.navigate(['login']);
  }

}
