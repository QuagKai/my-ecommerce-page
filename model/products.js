const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        enum: ['tops', 'pants', 'shoes', 'accessories']
    },
    size: {
        type: String,
        required: true
    },
    onsale: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('Products', productSchema)