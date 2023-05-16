const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        lowecase: true,
        unique: true,
        maxlength: 24
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customers',
        enum: ['customers', 'vendors', 'shippers', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema)