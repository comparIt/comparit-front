import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { User } from '../models/user';
import {CompareItAPIService} from './compareItAPI.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
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
        console.log('Username ', username, 'pwd ', password);
        return this.compareItAPIService.authenticate(username, password).then(token => {
            this.accessToken = token.token;
            console.warn('token reçu', this.accessToken);
            return this.accessToken;
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return (this.accessToken &&  Date.now() < this.expiresAt && this.expiresAt !== undefined);
    }
}