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

const deleteProducts = async(req, res, next) => {
    await Products.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Problem in deleting product");
      }
      res.redirect("/vendoronly");
    })
    .catch((error) => console.log('Deleting problem'));
    next();
}

module.exports = deleteProducts