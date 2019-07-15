import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comment } from './comments.model';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'post-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {
    postId: string;
    isLoading = true;
    private comments: Comment[] = [];
    constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) {};
    ngOnInit(): void {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.postId = paramMap.get('postId');
          //this.isLoading = false;
        });
        
    }    

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}