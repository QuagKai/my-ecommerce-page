// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// ID: 
// Ngo Quang Khai  (s3975831)              
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo


const multer = require('multer');

//Fucntion turn image data to data saved on mongodb
const storage = multer.diskStorage({
    destination : (req, file, cb) => { //Cheking file type jpg, png, jpeg
        if( file.mimetype === 'image/jpg'||
            file.mimetype === 'image/png'||
            file.mimetype === 'image/jpeg') {
                cb(null, 'public/images');
        } else{
            cb(new Error('not image', false))
        }
    },
    filename : (req, file, cb) => { //Create unique name for each image upload even if they are same images
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

module.exports = multer({ storage: storage }).single('image')