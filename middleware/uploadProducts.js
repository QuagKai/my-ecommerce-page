const Products = require('../model/products');

const uploadProducts = async(req, res, next) => {
    const newProduct = {
        name: req.body.name,
        gender: req.body.gender,
        descrip: req.body.descrip,
        image: {
            data: req.file.filename,
            contentType: 'image/png'
        },
        price: req.body.price,
        category: req.body.category,
        size: req.body.size,
        onsale: req.body.onsales
    }
    await Products.create(newProduct)
    .then(() => res.redirect('vendoronly'))
    .catch(() => res.redirect('vendoronly'));
    next();
};

module.exports = uploadProducts