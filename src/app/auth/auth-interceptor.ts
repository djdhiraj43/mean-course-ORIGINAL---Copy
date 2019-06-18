import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

/*Interceptor : It is a feature offered by Angular http client. It is a function that will run on any outgoing http request. We can manipulate these requests for eg. to attach a token. */

@Injectable() //@Injectable is needed because we are injecting a service into other service

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization", "Bearer "+ authToken)
        });
        return next.handle(authRequest);
    }
}