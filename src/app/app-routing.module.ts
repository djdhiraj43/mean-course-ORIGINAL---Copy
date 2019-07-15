import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { AuthorComponent } from './authors/author.component';
import { AuthGuard } from './auth/auth.guard';
import { CommentsComponent } from './comments/comments.component'

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'authors/:authorId', component: AuthorComponent },
  { path: 'comments/:postId', component: CommentsComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
