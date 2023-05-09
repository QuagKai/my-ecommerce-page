const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    username: {
        type: String,
        required: true,
        lowecase: true,
        maxlength: 24
    },
    password: {
        type: String,
        required: true,
        maxlength: 24,
    },
    role: {
        type: Number,
        default: 0,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema)