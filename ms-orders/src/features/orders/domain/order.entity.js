function buildOrderFromPayload(payload) {
  return {
    customerName: payload.customerName,
    destination: payload.destination,
    status: payload.status
  };
}

module.exports = { buildOrderFromPayload };
