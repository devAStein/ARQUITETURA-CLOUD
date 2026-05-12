const { getProductsRepository } = require("../infrastructure/product-repository-provider");
const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../application/product.usecases");

function getRepository() {
  return getProductsRepository();
}

async function list(_req, res, next) {
  try {
    const products = await listProducts(getRepository());
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const product = await getProductById(getRepository(), req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const created = await createProduct(getRepository(), req.body);
    if (created.validationErrors) {
      return res.status(400).json({
        error: "Validation error",
        details: created.validationErrors
      });
    }

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const updated = await updateProduct(getRepository(), req.params.id, req.body);
    if (updated?.validationErrors) {
      return res.status(400).json({
        error: "Validation error",
        details: updated.validationErrors
      });
    }

    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await deleteProduct(getRepository(), req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
