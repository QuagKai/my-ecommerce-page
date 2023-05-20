// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// ID: 
// Ngo Quang Khai  (s3975831)              
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo

const mongoose = require('mongoose');

//user model
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