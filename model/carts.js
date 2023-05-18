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

cartSchema.methods.addItemtoCart = async function(productsinDB, usersessionID) {
    if (isNaN(this.Qty)) {
        this.Qty = 0;
    }
    if (isNaN(this.totalPrice)) {
        this.totalPrice = 0;
    }
    const existingItemIndex = this.items.findIndex(p => p.id == productsinDB._id)
    if (existingItemIndex !== -1) {
        let itemtoAdd = this.items[existingItemIndex];
        itemtoAdd.qty += 1;
        this.Qty += 1;
        this.totalPrice += productsinDB.price;

        // this.items.push({
        //     id: productsinDB._id.toString(),
        //     name: productsinDB.name,
        //     qty: 1,
        //     price: productsinDB.price
        // })
        // this.Qty += 1;
        // this.totalPrice += productsinDB.price;
    } else {
        // let itemtoAdd = this.items[existingItem];
        // itemtoAdd.qty += 1;
        // this.Qty += 1;
        // this.totalPrice += productsinDB.price;
        this.items.push({
            id: productsinDB._id,
            name: productsinDB.name,
            qty: 1,
            price: productsinDB.price
        });
        this.Qty += 1;
        this.totalPrice += productsinDB.price;
    }

    // this.markModified('items')
    // try {
    //     await this.save(); // Save the cart
    // } catch (error) {
    //     console.log('Cannot save cartInstane');
    //     throw error; // Rethrow the error to be handled by the calling function
    // }

    return this.save()
}

cartSchema.methods.getItemfromCart = function() {
    return this
}

module.exports = mongoose.model('Carts', cartSchema);