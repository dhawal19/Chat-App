const mongoose = require('mongoose');
const {messageSchema} = require('./messageModel');
// defining user model schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    recentMessages:[messageSchema],
    refreshToken : {
        type: String,
        default :null
    }
});

const User = new mongoose.model('user', userSchema);
module.exports = User;