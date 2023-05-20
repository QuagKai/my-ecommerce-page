// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// ID: 
// Ngo Quang Khai  (s3975831)              
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo


const Products = require('../model/products');

//Upload product function
//When uploding product if the system will convert image to data saved on the mongo db and 
//then retrieve the data then convert to string with ascii method to get unique name of the product image
//Then loading image with unique name
const uploadProducts = async(req, res, next) => {
    const newProduct = {
        name: req.body.name,
        gender: req.body.gender,
        descrip: req.body.descrip,
        image: {
            data: req.file.filename,
            contentType: 'image/png'
        },
        price: req.body.price,
        category: req.body.category,
        size: req.body.size,
        onsale: req.body.onsales,
        creator: req.session.user.name
    }
    await Products.create(newProduct)
    .then(() => res.redirect('vendoronly'))
    .catch(() => res.redirect('vendoronly'));
    next();
};

module.exports = uploadProducts