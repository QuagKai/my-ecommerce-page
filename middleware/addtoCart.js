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



const Products = require('../model/products');
const Cart = require('../model/carts');

const addtoCart = async (req, res, next) => {
    const productId = req.params.id;
    const usersession = req.session.user;

    if (!usersession) {
        return res.redirect('/login');
    }

    if (usersession.role !== 'customer') {
        console.log('Only customer can add to cart');
    }

    try {
        let productsinDB = await Products.findById(productId);
        if (!productsinDB) {
            console.log('Item does not exist');
        } else {
            console.log('Item exists');
        }

        let existedCart = await Cart.findOne({ cartOwnerID: usersession.id });
        if (!existedCart) {
            existedCart = new Cart({ cartOwnerID: usersession.id });
            console.log('Cart created');
        } else {
            console.log('Cart exists');
        }

        await existedCart.addItemtoCart(productsinDB, usersession);
        console.log(existedCart.getItemfromCart());
        await existedCart.save();

        next();
    } catch (error) {
        console.log('Error adding item to cart:', error);
        next(error);
    }
};

module.exports = addtoCart;