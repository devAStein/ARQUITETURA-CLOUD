let nextOrderId = 3;
let memoryOrders = [
  {
    id: 1,
    customerName: "Maria Souza",
    destination: "Curitiba - PR",
    status: "pending"
  },
  {
    id: 2,
    customerName: "Joao Pereira",
    destination: "Sao Paulo - SP",
    status: "in_transit"
  }
];

const memoryOrderRepository = {
  requiresManualValidation: true,

  async findAll() {
    return memoryOrders;
  },

  async findById(orderId) {
    return memoryOrders.find((order) => order.id === orderId) || null;
  },

  async create(orderData) {
    const created = { id: nextOrderId++, ...orderData };
    memoryOrders.unshift(created);
    return created;
  },

  async updateById(orderId, orderData) {
    const index = memoryOrders.findIndex((order) => order.id === orderId);
    if (index === -1) return null;

    memoryOrders[index] = {
      ...memoryOrders[index],
      ...orderData
    };

    return memoryOrders[index];
  },

  async deleteById(orderId) {
    const before = memoryOrders.length;
    memoryOrders = memoryOrders.filter((order) => order.id !== orderId);
    return memoryOrders.length !== before;
  }
};

module.exports = { memoryOrderRepository };
