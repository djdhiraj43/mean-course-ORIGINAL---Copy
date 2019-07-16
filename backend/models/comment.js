const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, required: true },
    comment: { type: String, required: true },
    authorName: { type: String, required: true },
    comments: { type: mongoose.Schema.Types.Array}
})

module.exports = mongoose.model('Comment', commentSchema);