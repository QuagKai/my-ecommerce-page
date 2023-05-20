// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// Phan Tran Minh Toan
// Nguyen Kim Anh
// Hyeonseok Kang
// Oriol Mole Teiga
// ID: 
// Ngo Quang Khai  (s3975831)              
// Phan Tran Minh Toan (s3963231)
// Nguyen Kim Anh (s3939240)
// Hyeonseok Kang (s3963294)
// Oriol Mole Teiga (s3979344)
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo

const User = require('../model/user');

//Attach user info (no password) into session
const loginSet = async(req, res, next) => {
    const check = await User.findOne({      //Find a user by username from the input value before
        username:req.body.username
    })
    req.session.user = {        //Attach user info with found data
        id: check._id.toString(),
        name: check.username,
        role: check.role
    }
    // res.send(req.session.User);
    next();
}

module.exports = loginSet