let productsRepository;

function setProductsRepository(repository) {
  productsRepository = repository;
}

function getProductsRepository() {
  return productsRepository;
}

module.exports = {
  setProductsRepository,
  getProductsRepository
};
