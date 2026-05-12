function buildProductFromPayload(payload) {
  return {
    name: payload.name,
    weightKg: Number(payload.weightKg),
    destination: payload.destination
  };
}

module.exports = { buildProductFromPayload };
