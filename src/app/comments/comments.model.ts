export interface Comment {
    _id: string,
    refId: string,
    createdDate: Date,
    comment: string,
    authorName: string,
    comments: [Comment]
  }