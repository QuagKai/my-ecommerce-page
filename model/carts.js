const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartOwnerID: {
        type: String,
        required: true,
    },
    cartOwnerName: {
        type: String,
    },
    cartOwnerAddress: {
        type: String
    },
    items: [],
    Qty: {
        type: Number,
        min: 0
    },
    totalPrice: {
        type: Number,
        min: 0
    }
});

cartSchema.methods.addItemtoCart = function(productsinDB, usersessionID) {
    const existingItem = this.items.findIndex(p => p._id.toString() == productsinDB._id.toString())
    if (!existingItem) {
        this.items.push({
            id: productsinDB._id.toString(),
            name: productsinDB.name,
            qty: 1,
            price: productsinDB.price
        })
        this.Qty += 1;
        this.totalPrice += productsinDB.price;
    } else {
        let itemtoAdd = this.items[existingItem];
        itemtoAdd.qty += 1;
        this.Qty += 1;
        this.totalPrice += productsinDB.price;
    }
}
cartSchema.methods.getItemfromCart = function() {
    return this
}

module.exports = mongoose.model('Carts', cartSchema);