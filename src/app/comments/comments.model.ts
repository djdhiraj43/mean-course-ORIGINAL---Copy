export interface Comment {
    _id: string,
    post_id: string,
    createdDate: Date,
    comment: string,
    authorName: string,
    comments: Array<{createdDate: Date, comment: string, authorName: string, level: number, commentId: string, replyId: string}>
  }