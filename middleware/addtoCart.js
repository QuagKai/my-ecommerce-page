const Products = require('../model/products');
const Cart = require('../model/carts');
const bcrypt = require('bcrypt');

const addtoCart = async(req, res, next) => {
    // const hasedusersessionID = await bcrypt.hash(req.session.user.id, 10);
    const usersessionID = req.session.user.id;
    const productsinDB = await Products.findById(req.params.id).exec();
    Cart.save(productsinDB, usersessionID);
    console.log(Cart.getCart());
    console.log('Cart success')
    res.redirect('/allproducttest');

    // if (bcrypt.compare(hasedusersessionID, req.session.user.id)) {
    //     Cart.save(productsinDB, hasedusersessionID);
    //     console.log(Cart.getCart());
    //     console.log('Cart success')
    //     res.redirect('/allproducttest');
    // } else {
    //     next();
    // }
}

module.exports = addtoCart