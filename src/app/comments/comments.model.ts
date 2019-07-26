export interface Comment {
    _id?: string,
    post_id?: string,
    createdDate: Date,
    comment: string,
    authorName: string,
    comments: Array<Comment>
  }