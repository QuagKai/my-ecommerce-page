const Products = require('../model/products');

const deleteProducts = async(req, res, next) => {
    await Products.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Problem in deleting product");
      }
      res.redirect("/vendoronly");
    })
    .catch((error) => console.log('Deleting problem'));
    next();
}

module.exports = deleteProducts