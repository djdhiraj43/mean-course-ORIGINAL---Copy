import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

/*Interceptor : It is a feature offered by Angular http client. It is a function that will run on any outgoing http request. We can manipulate these requests for eg. to attach a token. */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "An unknown error occured!";
                if(error.error.message) {
                    errorMessage = error.error.message;
                }
                this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
                return throwError(error);  
            })
        )

    }
}