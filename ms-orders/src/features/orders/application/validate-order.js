function validateOrderPayload(payload) {
  if (!payload.customerName || !payload.destination || !payload.status) {
    return ["customerName, destination and status are required"];
  }

  return [];
}

module.exports = { validateOrderPayload };
