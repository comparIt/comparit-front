import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from './authentification.service';

@Injectable()
export class IsAdminGuardService implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const userLogedIn: boolean = this.authService.isAuthenticated() && this.authService.isAdmin();
        if (!userLogedIn) {
            this.router.navigate(['/login']);
        }
        return userLogedIn;
    }

}

