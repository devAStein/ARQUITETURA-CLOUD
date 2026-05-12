const { getOrdersRepository } = require("../infrastructure/order-repository-provider");
const {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../application/order.usecases");

function getRepository() {
  return getOrdersRepository();
}

async function list(_req, res) {
  const orders = await listOrders(getRepository());
  res.json(orders);
}

async function getById(req, res) {
  const order = await getOrderById(getRepository(), req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });
  res.json(order);
}

async function create(req, res) {
  const created = await createOrder(getRepository(), req.body);
  if (created.validationErrors) {
    return res.status(400).json({
      error: "Validation error",
      details: created.validationErrors
    });
  }

  res.status(201).json(created);
}

async function update(req, res) {
  const updated = await updateOrder(getRepository(), req.params.id, req.body);
  if (updated?.validationErrors) {
    return res.status(400).json({
      error: "Validation error",
      details: updated.validationErrors
    });
  }

  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
}

async function remove(req, res) {
  const deleted = await deleteOrder(getRepository(), req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove
};
