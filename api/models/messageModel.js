const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Message = new mongoose.model('message', messageSchema);
module.exports = {Message, messageSchema}