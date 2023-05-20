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

//product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Kids'],
        default: 'all'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    descrip: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        require: true,
        enum: ['Tops', 'Pants', 'Shoes', 'Accessories']
    },
    size: {
        type: String,
        required: true
    },
    onsale: {
        type: String,
    },
    creator: {
        type: String,
    }
});

module.exports = mongoose.model('Products', productSchema);