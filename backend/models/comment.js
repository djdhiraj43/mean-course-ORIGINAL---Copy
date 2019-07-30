const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, required: true },
    comment: { type: String, required: true },
    authorName: { type: String, required: true },
    comments: { type: [{
        createdDate: { type: Date, required: true },
        comment: { type: String, required: true },
        authorName: { type: String, required: true },
        level: { type: Number, required: true},
        commentId: { type: mongoose.Schema.Types.ObjectId, required: true },
        replyId: { type: mongoose.Schema.Types.ObjectId, required: true }
    }]}
},{collection:"comments"});

module.exports = mongoose.model('Comment', commentSchema);