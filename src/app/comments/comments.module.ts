import { NgModule } from '@angular/core';

import { CommentsComponent } from './comments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        CommentsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule,
        FormsModule
    ]
})
export class CommentsModule {}