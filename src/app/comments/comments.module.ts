import { NgModule } from '@angular/core';

import { CommentsComponent } from './comments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';


@NgModule({
    declarations: [
        CommentsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule,
        FormsModule,
        MatListModule
    ]
})
export class CommentsModule {}