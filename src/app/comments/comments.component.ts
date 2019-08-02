import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Comment } from './comments.model';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Post } from '../posts/post.model';

@Component({
    selector: 'post-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
    
    public level: number = 0;
    public show: boolean = false;
    postAuthor: string;
    post: any;
    postId: any;
    isLoading = true;
    public comments: Comment[] = [];
    userIsAuthenticated = false;
    userId: string; //
    private authStatusSub: Subscription; //
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
            this.post = this.postsService.getPost(this.postId).subscribe(postData => {
                this.post = postData;
                console.log("creator : "+postData.creator);
                this.postsService.getAuthor(postData.creator).subscribe(author => {
                    this.postAuthor = author.name;
                    this.isLoading = false;
                })
            })
        })

        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.isLoading = false;
    });
        
    }    

    toggle(event) {
        //this.show = !this.show;
        var target = event.target;
        var id = target.attributes.id.nodeValue;
        console.log("id : "+id);
        document.getElementById(id+"c1").style.display = "inline-block";
        document.getElementById(id+"c2").style.display = "inline-block";
        document.getElementById(id).style.display = "none";
    }

    onAddComment(comment: any, form, replyId) {
        if(form.invalid) {
            return;
        }
        this.isLoading = true;

        this.postsService.getAuthor(this.authService.getUserId()).subscribe(author => {
               console.log("form : "+JSON.stringify(form));
            this.postsService.addComment(this.postId, comment, author.name);
           })             
    }

    onAddComment_(formData, form) {
        //comment_, id : string, form
        console.log("formData : "+JSON.stringify(formData));
        //console.log("comment_ : "+comment_);
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        
        this.postsService.getAuthor(this.authService.getUserId()).subscribe(author => {
            formData.authorName = author.name;
            formData.createdDate = new Date();
            var a = new Date();
            console.log("type of created date : "+typeof(a));
            this.postsService.addComment_(this.postId, formData).subscribe((res) => { 
                console.log("Response --- : " +JSON.stringify(res));                
                this.isLoading = false;
            });
           })
    }
    ngOnDestroy(): void {
        this.authStatusSub.unsubscribe();
    }
}