import { NgModule } from '@angular/core';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthorComponent } from '../authors/author.component' //Delete after testing


@NgModule({
    declarations: [
        PostCreateComponent,
        PostListComponent,
        AuthorComponent //Delete after testing
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule 
    ]
})
export class PostsModule {}