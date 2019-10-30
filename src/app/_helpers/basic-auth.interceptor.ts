import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../shared/services/authentification.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        // const currentUser = this.authenticationService.currentUserValue;
        if (this.authenticationService.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.accessToken}`
                }
            });
            console.log('setting token : ', this.authenticationService.accessToken);
        }

        return next.handle(request);
    }
}
