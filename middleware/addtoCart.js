const Products = require('../model/products');
const Cart = require('../model/carts');

const addtoCart = async(req, res, next) => {
    const productId = req.params.id;
    const usersession = req.session.user;
    let productsinDB = await Products.findById(productId)
    if(!productsinDB) {
        console.log('Item dont existed');
    } else {
        console.log('Item Existed');
    }

    let existedCart = await Cart.findOne({cartOwnerID : usersession.id})
    if(!existedCart) {
        existedCart = new Cart({cartOwnerID : usersession.id});
        console.log('Cart created');
    } else {
        console.log('Cart existed');
    }

    // await existedCart.addItemtoCart(productsinDB, usersession);
    // existedCart.markModified('items');
    await existedCart.addItemtoCart(productsinDB, usersession)
}

module.exports = addtoCart