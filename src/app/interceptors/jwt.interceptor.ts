import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentToken = this.authenticationService.currentTokenValue;
        console.log("intercept->currentToken=" + currentToken.token)
        if (currentToken && currentToken.token) {
            console.log("adding header")
            let cloned_request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentToken.token}`
                }
            });
            return next.handle(cloned_request);
        }

        return next.handle(request);
    }
}