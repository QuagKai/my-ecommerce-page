const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    cartOwnerId: {
        type: String
    },
    cartOwner: {
        type:String
    },
    cartAddress: {
        type:String
    },
    items: [],
    totalPrice: {
        type: Number,
        min: 0
    }
});

cartSchema.methods.addItemCart = function(product) {
    const existingItemCart = this.items.findIndex(p => p.id.toString() === product._id.toString())
    if (existingItemCart >= 0) {
        const existedItemCart = this.items[existingItemCart];
        existedItemCart.qty += 1;
        this.totalPrice += product.price;
    }else {
        const productInCart = {
            id: product._id,
            name: product.name,
            price: product.price,
            qty: 1
        };
        this.items.push(productInCart);
        this.totalPrice += product.price;
    }
}

cartSchema.methods.getItemCart = async function() {
    return this
}

module.exports = mongoose.model('Carts', cartSchema)