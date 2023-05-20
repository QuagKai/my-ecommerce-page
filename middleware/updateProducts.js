// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// ID: 
// Ngo Quang Khai  (s3975831)
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo

//Require model
const Products = require('../model/products');


//Edit product information function
const updateProducts = async(req, res, next) => {
    const newProduct = {    //Take all the info in a modal dialog and you have to upload image every single time you want to update your product
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
    }
    console.log(req.params.id);
    await Products.findByIdAndUpdate( req.params.id, newProduct) //Find product with _id in the achor link
    .then(() => res.redirect('/vendoronly'))    //Handle error part
    .catch(() => res.redirect('/vendoronly'));
    next();
};

module.exports = updateProducts