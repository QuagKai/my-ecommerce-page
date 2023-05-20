const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartOwnerID: {
    type: String,
    required: true,
  },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId, // Store the product ID as an ObjectId
        ref: 'Product', // Reference the 'Product' model
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  Qty: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  checkout: {
    type: Boolean,
    default: false,
  },
  storage: {
    type: String,
  }
});

cartSchema.methods.updateItemQuantity = async function (productId, quantity) {
  const item = this.items.find((item) => item.id.equals(productId));
  console.log(quantity, productId);

  const previousQuantity = item.qty;
  item.qty = quantity;
  this.Qty += quantity - previousQuantity;
  this.totalPrice += item.price * (quantity - previousQuantity);
  console.log('Got here');

  try {
    const savedCart = await this.save();
    console.log('Cart saved:', savedCart);
    return savedCart;
  } catch (error) {
    console.error('Failed to save cart:', error);
    throw error;
  }
};

cartSchema.statics.findOneByOwnerID = function (ownerID) {
  return this.findOne({ cartOwnerID: ownerID });
};

cartSchema.methods.storageUpdater = async function (storage) {
  this.storage = storage;
  return this.save();
};

cartSchema.methods.addItemtoCart = async function (productsinDB) {
  if (isNaN(this.Qty)) {
    this.Qty = 0;
  }
  if (isNaN(this.totalPrice)) {
    this.totalPrice = 0;
  }

  const existingItemIndex = this.items.findIndex((p) => p.id.equals(productsinDB._id));
  if (existingItemIndex !== -1) {
    let itemtoAdd = this.items[existingItemIndex];
    itemtoAdd.qty += 1;
    this.Qty += 1;
    this.totalPrice += productsinDB.price;
  } else {
    this.items.push({
      id: productsinDB._id,
      name: productsinDB.name,
      qty: 1,
      price: productsinDB.price,
    });
    this.Qty += 1;
    this.totalPrice += productsinDB.price;
  }

  return this.save();
};

cartSchema.methods.updateCheckoutStatus = async function (status) {
  this.status = status;
  return this.save();
};

cartSchema.methods.getItemfromCart = function () {
  return this;
};

const Cart = mongoose.model('Cart', cartSchema);

async function getCartData(userId) {
  try {
    const cart = await Cart.findOne({ cartOwnerID: userId });
    return cart;
  } catch (error) {
    throw new Error('Error retrieving cart data');
  }
}



module.exports = {
  Cart: mongoose.model('Cart', cartSchema),
  getCartData: getCartData
};