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

cartSchema.methods.addItemtoCart = async function(productsinDB) {
    if (isNaN(this.Qty)) {
        this.Qty = 0;
    }
    if (isNaN(this.totalPrice)) {
        this.totalPrice = 0;
    }
    let existingItemIndex = this.items.findIndex((p) => p.id == productsinDB._id)
    console.log('existingItemIndex:', existingItemIndex);
    console.log('productsinDB._id:', productsinDB._id);
    console.log('this.items:', this.items);
    if (existingItemIndex >= 0) {
        let itemtoAdd = this.items[existingItemIndex];
        itemtoAdd.qty += 1;
        this.Qty += 1;
        this.totalPrice += productsinDB.price;
        console.log('Đã tăng lượng')

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
    return this.save()
}

cartSchema.methods.getItemfromCart = function() {
    return this
}

module.exports = mongoose.model('Carts', cartSchema);