const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const commentSchema = new Schema({
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdDate: { type: Date, required: true },
    comment: { type: String, required: true },
    authorName: { type: String, required: true }
}, {_id: true});

commentSchema.add({comments: [commentSchema]});

module.exports = mongoose.model('Comment', commentSchema);