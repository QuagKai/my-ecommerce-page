const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Men', 'Women', 'Kids'],
        default: 'all'
    },
    image: {
        data: Buffer,
        contentType: String
    },
    descrip: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        require: true,
        enum: ['Tops', 'Pants', 'Shoes', 'Accessories']
    },
    size: {
        type: String,
        required: true
    },
    onsale: {
        type: String,
    },
    creator: {
        type: String,
    }
});

module.exports = mongoose.model('Products', productSchema);