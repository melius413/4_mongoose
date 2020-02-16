const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Type: ObjectId } = Schema;
const commentSchema = new Schema({
    writer: {
        type: ObjectId,
        required: true,
        ref: 'User' // 참조모델기입
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);