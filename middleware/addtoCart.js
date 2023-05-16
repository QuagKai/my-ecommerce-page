// const Cart = require('../model/carts');
const Products = require('../model/products');
const bcrypt = require('bcrypt');
const retrieveUserCart = require('./retrieveUserCart');

const addtoCart = async(req, res, next) => {
    const usersessionID = req.session.user.id;
    const userCart = retrieveUserCart(usersessionID);
  
    if (!userCart) {
      // Handle the case where the user cart is not found
      return res.status(404).send('User cart not found');
    } else {
        const productsinDB = await Products.findById(req.params.id)
        .then(() => console.log('product find success'))
        .catch((error) => console('error in finding'))

        userCart.addItemCart(productsinDB)
        await userCart.save()
        .then(() => console.log('Cart save'))
        .cathc((error) => console.log('Cart didnt save'))
        console.log(userCart);
        res.redirect('/allproducttest');
    }

    // const hasedusersessionID = await bcrypt.hash(req.session.user.id, 10);
    // Cart.save(productsinDB, usersessionID);
    // console.log(Cart.getCart());

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