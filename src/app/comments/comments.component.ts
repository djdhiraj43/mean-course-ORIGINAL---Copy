import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comment } from './comments.model';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'post-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
    postId: string;
    isLoading = true;
    public comments: Comment[] = [];
    constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) {};
    ngOnInit(): void {
        this.isLoading = true;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          this.postId = paramMap.get('postId');
          //this.isLoading = false;
        });
        this.postsService.getComments(this.postId);
        this.postsService.getCommentsUpdateListener().subscribe(commentsData => {
            this.comments = commentsData.comments;
            console.log("Comments : "+this.comments);
            this.isLoading = false;
        })
        
    }    

    onAddComment(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        this.postsService
    }
    /*ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }*/
}