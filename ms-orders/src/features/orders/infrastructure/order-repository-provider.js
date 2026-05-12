let ordersRepository;

function setOrdersRepository(repository) {
  ordersRepository = repository;
}

function getOrdersRepository() {
  return ordersRepository;
}

module.exports = {
  setOrdersRepository,
  getOrdersRepository
};
