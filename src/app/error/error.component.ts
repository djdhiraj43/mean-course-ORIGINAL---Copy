import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {} 
    //Here we are using @Inject to inject the message in the error.component from error-interceptor instead instead of from this file
}