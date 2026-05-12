const { Product } = require("./product.mongoose-model");

const mongoProductRepository = {
  requiresManualValidation: false,

  findAll() {
    return Product.find().sort({ createdAt: -1 });
  },

  findById(productId) {
    return Product.findById(productId);
  },

  create(productData) {
    return Product.create(productData);
  },

  updateById(productId, productData) {
    return Product.findByIdAndUpdate(productId, productData, {
      new: true,
      runValidators: true,
      overwrite: false
    });
  },

  deleteById(productId) {
    return Product.findByIdAndDelete(productId);
  }
};

module.exports = { mongoProductRepository };
