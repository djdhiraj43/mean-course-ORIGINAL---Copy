import { NgModule } from '@angular/core';

import { AuthorComponent } from './author.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        AuthorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ]
})
export class AuthorModule {}