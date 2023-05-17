const Products = require('../model/products');
const Cart = require('../model/carts');

const addtoCart = async(req, res, next) => {
    const productId = req.params.id;
    const usersessionID = req.session.user.id;
    const productsinDB = await Products.findById(productId)
    .then((product) => console.log(product))
    .catch((error) => console.log('Item no existed'))

    let existedCart = await Cart.findOne({cartOwnerID : usersessionID})
    if(!existedCart) {
        existedCart = new Cart({cartOwnerID : usersessionID});
        console.log('Cart existed');
    } else {
        console.log('Cart created');
        return existedCart
    }

    existedCart.addItemtoCart(productsinDB, usersessionID);
    await existedCart.save()
    .then(() => console.log(Cart.getItemfromCart()))
    .catch((error) => console.log('Cannot save cart'))
}

module.exports = addtoCart