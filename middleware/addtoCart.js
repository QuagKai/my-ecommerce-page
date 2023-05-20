// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: 
// Ngo Quang Khai
// Oriol Mole Teiga
// ID: 
// Ngo Quang Khai  (s3975831)              
// Oriol Mole Teiga (s3979344)
// Acknowledgement: Boostrap v5.0+, ExpressJS, NodeJS, MongoDB, Ejs, Bcrypt, Multer, Express-session, Connect-Mongo


//Require model
const Products = require('../model/products');
const Cart = require('../model/carts');

//Add to Cart function
const addtoCart = async (req, res, next) => {
    const productId = req.params.id;    //Assign id product
    const usersession = req.session.user;      //Assigm user in current session

    if (!usersession) {
        return res.redirect('/login');  //Check if current user has logged in
    }

    if (usersession.role !== 'customer') {  //Check if user'role is customer because only customer create cart
        console.log('Only customer can add to cart');
    }

    try {
        let productsinDB = await Products.findById(productId); //Find product by _id from mongodb
        if (!productsinDB) {  // This step is just for handle error
            console.log('Item does not exist'); //If not exited
        } else {
            console.log('Item exists'); //If existed
        }

        let existedCart = await Cart.findOne({ cartOwnerID: usersession.id }); //Find user's cart by _id from current user with their id in the current session
        if (!existedCart) { //This step is for handel error
            existedCart = new Cart({ cartOwnerID: usersession.id });
            console.log('Cart created');//If existed
        } else {
            console.log('Cart exists');//If not existed
        }

        await existedCart.addItemtoCart(productsinDB, usersession); //Use the methods to add item in the items array, the data is from above this code
        console.log(existedCart.getItemfromCart()); // console log recent user cart
        await existedCart.save(); // Save user cart

        next(); //Exit out of function load in the command in index.js
    } catch (error) {
        console.log('Error adding item to cart:', error); // Handle error part
        next(error);
    }
};

module.exports = addtoCart;