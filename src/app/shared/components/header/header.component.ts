import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {GlobalConfigurationService} from '../../services/globalConfiguration.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentification.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public config: GlobalConfigurationService, private router: Router, private auth: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToAdmin() {
    this.router.navigate(['/admin/website']);
  }

  goToUploadCSV() {
    this.router.navigate(['/admin/upload/csv']);
  }

  goToUploadURL() {
    this.router.navigate(['/admin/upload/url']);
  }

  goToManageUsers() {
    this.router.navigate(['admin/manage/users']);
  }

  goToConnexion() {
    this.router.navigate(['login']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToSavedFilter() {
    this.router.navigate(['user/filter']);
  }

  logout() {
    this.auth.logout();
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  get user(): User {
    return this.auth.currentUserValue;
  }
}
