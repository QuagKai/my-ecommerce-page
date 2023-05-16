const mongoose = require('mongoose');
const Products = require('./products');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        lowecase: true,
        unique: true,
        maxlength: 24
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customers',
        enum: ['customers', 'vendors', 'shippers', 'admin']
    },
    // cart: {
    //     cartStorage: {
    //         type: Number,
    //         required: true,
    //     },
    //     item: [{
    //         itemId: {
    //             type : mongoose.Types.ObjectId,
    //             require: true
    //         },
    //         itemName: {
    //             type: String,
    //             require: true,
    //         },
    //         itemQty: {
    //             type: Number,
    //         },
    //         itemPrice: {
    //             type: Number,
    //             required: true,
    //             min: 0
    //         }
    //     }],
    //     cartTotalPrice: {
    //         type: Number,
    //         default: 0,
    //         min: 0
    //     }
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// userSchema.method.addtoCart = async(product) => {
//     const cart = this.cart;
//     console.log(product)
//     await Products.findById(product)
//     .then((product) => {
//         const existedProduct = cart.item.findOne({itemId: product._id})
//         if(!existedProduct) {
//             cart.item.push({
//                 itemId: product._id,
//                 itemName: product.name,
//                 itemQty: 1,
//                 itemPrice: product.price,
//             })
//             cart.cartTotalPrice += product.price
//         } else {
//             cart.item[existedProduct].itemQty += 1;
//             cart.cartTotalPrice += product.price
//         }   
//     })
// }

module.exports = mongoose.model('User', userSchema)