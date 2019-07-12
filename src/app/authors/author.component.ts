import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './author.model';
import { Post } from '../posts/post.model';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'author-details',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
  })

export class AuthorComponent implements OnInit, OnDestroy {
    isLoading = true;
    count: number;
    userIsAuthenticated = false;
    authorId: string;
    author: User;
    authorPosts: Post[] = [];
    userId: string;
    private authStatusSub: Subscription;
    constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) {};
    ngOnInit() {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.authorId = paramMap.get('authorId');
          //this.isLoading = false;
        });
        this.postsService.getAuthor(this.authorId).subscribe(authorData => {          
          this.author = { id: authorData._id, name: authorData.name, email: authorData.email };
          this.isLoading = false;
        })

        this.postsService.getAuthorPosts(this.authorId).subscribe(authorData => {
          this.authorPosts = authorData.posts;
          this.count = authorData.maxPosts;
          console.log("Author posts : "+ JSON.stringify(this.authorPosts));
        })

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.userId = this.authService.getUserId();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        //this.userId = this.authService.getUserId();
    });
        
      };
    
    ngOnDestroy() {

    };  
}