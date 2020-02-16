const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({ // db에 해당 콜랙션이 없으면, 생성한다.
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);