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
        console.log('Cart existed');
    } else {
        console.log('Cart created');
    }

    // await existedCart.addItemtoCart(productsinDB, usersession);
    // existedCart.markModified('items');
    await existedCart.save(existedCart.addItemtoCart(productsinDB, usersession))
    .then(() => {
        console.log(Cart.getItemfromCart())
        next()
    })
    .catch((error) => {
        console.log('Cannot save cart')
        next()
    })
}

module.exports = addtoCart