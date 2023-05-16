const mongoose = require('mongoose');

let cart = null;

class Cart {
    static save(product, userID) {
        if(cart && cart.id == userID) {
            const existedProduct = cart.products.findIndex(p => p.id.toString() === product._id.toString());
            console.log(existedProduct);
            if (existedProduct >= 0 ) {
                const existingProduct =  cart.products[existedProduct];
                existingProduct.qty += 1;
                cart.totalPrice += product.price;
            } else {
                const productInCart = {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    qty: 1
                };
                cart.products.push(productInCart);
                cart.totalPrice += product.price;
            }
        
        }else {
            cart = {
                id: {
                    type: String
                },
                products: [],
                totalPrice: {
                    type: Number,
                    min: 0
                }
            };

            const productInCart = {
                id: product._id,
                name: product.name,
                price: product.price,
                qty: 1
            };
            cart.id = userID,
            cart.products.push(productInCart);
            cart.totalPrice = product.price;
    
        }
    }

    static getCart() {
        return cart
    }
}

module.exports = Cart
// const cartSchema = new mongoose.Schema({
//     cardAddress: {
//         type: String
//     },
//     cartOwner: {
//         type: String,
//         required: true,
//     },
//     cartStorage: {
//         type: Number
//     },
//     cardItems: [{
//         item: {
//             itemid: {
//                 type : mongoose.Schema.Types.ObjectId,
//                 require: true
//             },
//             itemName: {
//                 type: String,
//                 require: true,
//             },
//             itemQty: {
//                 type: Number,
//                 default: 1
//             },
//             itemPrice: {
//                 type: Number,
//                 required: true,
//                 min: 0
//             }
//         }    
//     }],
//     cardTotalPrice: {
//         type: Number,
//         min: 0
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }
// });

// module.exports = mongoose.model('Carts', cartSchema)