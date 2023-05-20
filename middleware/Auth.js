// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// ID: 
// Ngo Quang Khai  (s3975831)              
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo


//require model, function and package
const User = require('../model/user')
const bcrypt = require('bcrypt');
const setLogin = require('./setLogin');

const authRegister = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //For encrypted password
    
    //take all data from the form
    const data = { 
        name:req.body.name,
        username:req.body.username,
        password:hashedPassword,
        role: req.body.role
    }
    await User.insertMany([data]) // create User

    setLogin(req, res, next);   //atached user info (no password) to current session

};

//Role vendors checking
const authRoleVendor = (req, res, next) => {
    authLogged(req, res, () => {
        if (req.session.user.role === 'vendors') {
          next();
        } else {
          res.status(401).send('You do not have the "vendor" role to access this page');
        }
    })
    // authLogged(req.session.user.role)
    // if(req.session.user.role == 'vendors') {
    //     next()
    // } else {
    //     res.status(401).send('You do not have vendor role to access on this page')
    // }
};
//Role shippers checking
const authRoleShipper = (req, res, next) => {
    authLogged(req, res, () => {
        if (req.session.user.role === 'shippers') {
          next();
        } else {
          res.status(401).send('You do not have the "shipper" role to access this page');
        }
    })
};


//Login Authentication
const authLogin = async (req, res, next) => {
    try {
        const check = await User.findOne({ //find the user with same username
                username:req.body.username
        })
        if(bcrypt.compare(check.password, req.body.password)) { // Checking the password with the encrypted passwork with bcryot package
            next()
        } else {
            res.send('Wrong password')
        }
    }
    catch {
        res.send('Wrong details')
    }
}

//Check for the current user have logged in or not 
const authLogged = async (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role) {
        next();
    } else {
        res.status(400).send('You have to log in with an account that has this role');
    }
}

//Role check for customers
const authRoleCustomer = (req, res, next) => {
    authLogged(req, res, () => {
        if (req.session.user.role === 'customers') {
          next();
        } else {
          res.status(401).send('You do not have the "customer" role to access this page');
        }
    })
};

module.exports = {
    authRegister,
    authRoleVendor,
    authRoleShipper,
    authLogin,
    authRoleCustomer
}