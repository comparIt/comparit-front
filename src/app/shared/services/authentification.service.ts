import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {CompareItAPIService} from './compareItAPI.service';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user: User;
  private expiresAt: number;
  accessToken: string;

  constructor(private http: HttpClient, private compareItAPIService: CompareItAPIService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.compareItAPIService.authenticate(username, password).then(token => {
      this.accessToken = token.token;
      return this.compareItAPIService.getCurrentUser();
    }).then((user: User) => {
      this.user = User.buildUser(user);
      this.currentUserSubject = new BehaviorSubject<User>(user);
      this.currentUser = this.currentUserSubject.asObservable();
      return this.accessToken;
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.accessToken = null;
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this.accessToken !== undefined && this.accessToken !== null;
  }

  public isAdmin(): boolean {
    return this.user && this.user.role === 'ROLE_ADMIN';
  }
}
