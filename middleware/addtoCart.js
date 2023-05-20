const Products = require('../model/products');
const Cart = require('../model/carts');
const { findOneByOwnerID } = require('../model/carts');


const addtoCart = async (req, res, next) => {
  const productId = req.params.id;
  const usersession = req.session.user;

  if (!usersession) {
    return res.redirect('/login');
  }

  if (usersession.role !== 'customer') {
    console.log('Only customers can add items to the cart');
  }

  try {
    let productsinDB = await Products.findById(productId);
    if (!productsinDB) {
      console.log('Item does not exist');
    } else {
      console.log('Item exists');
    }

    let existedCart = await Cart.findOneByOwnerID(usersession.id);
    if (!existedCart) {
      existedCart = new Cart({ cartOwnerID: usersession.id });
      console.log('Cart created');
    } else {
      console.log('Cart exists');
    }

    await existedCart.addItemtoCart(productsinDB);
    console.log(existedCart.items);
    await existedCart.save();

    // Pass the cart data to the view
    res.locals.cart = existedCart;

    next();
  } catch (error) {
    console.log('Error adding item to cart:', error);
    next(error);
  }
};

module.exports = addtoCart;
