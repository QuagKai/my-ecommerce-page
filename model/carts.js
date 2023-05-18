const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartOwnerID: {
    type: String,
    required: true,
  },
  items: [
    {
      id: {
        type: String,
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
  Status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
});

cartSchema.methods.addItemtoCart = async function (productsinDB) {
  if (isNaN(this.Qty)) {
    this.Qty = 0;
  }
  if (isNaN(this.totalPrice)) {
    this.totalPrice = 0;
  }

  const existingItemIndex = this.items.findIndex((p) => p.id === productsinDB._id.toString());
  if (existingItemIndex !== -1) {
    let itemtoAdd = this.items[existingItemIndex];
    itemtoAdd.qty += 1;
    this.Qty += 1;
    this.totalPrice += productsinDB.price;
  } else {
    this.items.push({
      id: productsinDB._id.toString(),
      name: productsinDB.name,
      qty: 1,
      price: productsinDB.price,
    });
    this.Qty += 1;
    this.totalPrice += productsinDB.price;
  }

  return this.save();
};

cartSchema.methods.getItemfromCart = function () {
  return this;
};

module.exports = mongoose.model('Cart', cartSchema);