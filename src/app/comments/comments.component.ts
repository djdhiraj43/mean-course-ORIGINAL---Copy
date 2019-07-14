import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comment } from './comments.model';

@Component({
    selector: 'post-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {
    private comments: Comment[] = [];
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }    

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}