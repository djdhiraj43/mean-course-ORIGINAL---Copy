import { Post } from './post.model';
import { Comment } from '../comments/comments.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, ObjectUnsubscribedError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { stringify } from 'querystring';

const BACKEND_URL = environment.apiUrl + "/posts/";
const BACKEND_URL_AUTHORS = environment.apiUrl + "/authors/";
const BACKEND_URL_AUTHORS_POSTS = environment.apiUrl + "/authors/posts/";
const BACKEND_URL_COMMENTS = environment.apiUrl + "/comments/";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private postsUpdated = new Subject<{posts:Post[], postCount: number}>();
  private commentsUpdated = new Subject<{comments:Comment[], commentsCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}` //backticks help to convert dynamic variables to string
    this.http.get<{message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(map((postData) => {
        return { posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          };
        }), maxPosts: postData.maxPosts};
      }))
      .subscribe((transformedPostsData) => {
        this.posts = transformedPostsData.posts;
        this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostsData.maxPosts});
        
      })
    //return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getCommentsUpdateListener() {
    return this.commentsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{_id: string; title: string; content: string; imagePath: string; creator: string;}>(BACKEND_URL + id);
  }


  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message: string, post: Post}>(BACKEND_URL, postData)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    })

  }

  updatePost(id: string, title: string, content: string, image: File | string){
    let postData : Post| FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
        postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null
      }
    }
    this.http.put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL  + postId);;
  };

  getAuthor(authorId: string) {
    //console.log("backend_url_authors : "+BACKEND_URL_AUTHORS+authorId);
    return this.http.get<{ _id: string, name: string, email: string; }>(BACKEND_URL_AUTHORS + authorId);
  };

  getAuthorPosts(authorId: string) : Observable<any> {
    //console.log("backend_url_authors : "+BACKEND_URL_AUTHORS+authorId);
    console.log(BACKEND_URL_AUTHORS_POSTS + authorId);
    return this.http.get<{message: string, posts: any, maxPosts: number }>(BACKEND_URL_AUTHORS_POSTS + authorId)
  };

  getComments(postId: string) {
    console.log("url : " + BACKEND_URL_COMMENTS + postId);
    this.http.get<{message: string, comments: any, maxComments: number }>(BACKEND_URL_COMMENTS + postId)
    .subscribe(commentsData => {
      this.comments = commentsData.comments;
      console.log("Comments from posts service : "+ JSON.stringify(commentsData.comments));
      this.commentsUpdated.next({comments: [...this.comments], commentsCount: commentsData.maxComments});
    })
    
  }

  addComment(postId: string, comment: string, authorName: string) {
    // const commentData = new FormData();
    // commentData.append('postId', postId);
    // const createdDate: Date = new Date();
    // commentData. 
    const commentData = {
      "postId": postId,
      "createdDate": new Date(),
      "comment": comment,
      "authorName": authorName,
      "comments": []
    }
    
    this.http.post<{message: string, comment: Comment}>(BACKEND_URL_COMMENTS + postId, commentData)
    .subscribe((cmtData) => {
      var up_comments = [...this.comments];
      up_comments.push(cmtData.comment);
      this.comments = up_comments;
      this.commentsUpdated.next({comments: [...this.comments], commentsCount: this.comments.length});
      //this.router.navigate(["/comments/"+postId]);
    })

  } 

  addComment_(postId: string, commentData) {
    this.http.put<{message: string, comment: any}>(BACKEND_URL_COMMENTS + postId, commentData)
      .subscribe((cmtData) => {
        console.log("Message : "+commentData.message);
        this.router.navigate(["/"]);
      })
  }

}

