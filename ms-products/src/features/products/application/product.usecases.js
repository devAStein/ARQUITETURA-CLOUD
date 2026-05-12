const { validateProductPayload } = require("./validate-product");
const { buildProductFromPayload } = require("../domain/product.entity");

async function listProducts(repository) {
  return repository.findAll();
}

async function getProductById(repository, productId) {
  return repository.findById(productId);
}

async function createProduct(repository, payload) {
  if (repository.requiresManualValidation) {
    const errors = validateProductPayload(payload);
    if (errors.length) return { validationErrors: errors };
    return repository.create(buildProductFromPayload(payload));
  }

  return repository.create(payload);
}

async function updateProduct(repository, productId, payload) {
  if (repository.requiresManualValidation) {
    const errors = validateProductPayload(payload);
    if (errors.length) return { validationErrors: errors };
    return repository.updateById(productId, buildProductFromPayload(payload));
  }

  return repository.updateById(productId, payload);
}

async function deleteProduct(repository, productId) {
  return repository.deleteById(productId);
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
