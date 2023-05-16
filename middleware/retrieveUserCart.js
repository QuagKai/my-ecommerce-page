const Carts = require('../model/carts-sample2');

const retrieveUserCart = async(req) => {
    let userCart = await Carts.findOne({cartOwnerId: req})
    if (!userCart) {
        await Carts.create({cartOwnerId: req})
        .then (()=> console.log('Cart success'))
        .catch((error) => console.log('Cart failed'))

    } else {
        return userCart
    }
}

module.exports = retrieveUserCart