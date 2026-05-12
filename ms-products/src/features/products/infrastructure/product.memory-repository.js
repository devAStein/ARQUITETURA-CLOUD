let memoryProducts = [
  {
    _id: "local-product-1",
    name: "Notebook Dell",
    weightKg: 2.5,
    destination: "Curitiba - PR",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: "local-product-2",
    name: "Monitor LG",
    weightKg: 4.2,
    destination: "Sao Paulo - SP",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function createMemoryProduct(productData) {
  const now = new Date().toISOString();
  return {
    _id: `local-product-${Date.now()}`,
    ...productData,
    createdAt: now,
    updatedAt: now
  };
}

const memoryProductRepository = {
  requiresManualValidation: true,

  async findAll() {
    return memoryProducts;
  },

  async findById(productId) {
    return memoryProducts.find((product) => product._id === productId) || null;
  },

  async create(productData) {
    const created = createMemoryProduct(productData);
    memoryProducts.unshift(created);
    return created;
  },

  async updateById(productId, productData) {
    const index = memoryProducts.findIndex((product) => product._id === productId);
    if (index === -1) return null;

    memoryProducts[index] = {
      ...memoryProducts[index],
      ...productData,
      updatedAt: new Date().toISOString()
    };

    return memoryProducts[index];
  },

  async deleteById(productId) {
    const before = memoryProducts.length;
    memoryProducts = memoryProducts.filter((product) => product._id !== productId);
    return memoryProducts.length !== before;
  }
};

module.exports = { memoryProductRepository };
