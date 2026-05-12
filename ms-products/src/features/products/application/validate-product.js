function validateProductPayload(payload) {
  const errors = [];

  if (!payload.name) errors.push("name is required");
  if (!payload.destination) errors.push("destination is required");
  if (payload.weightKg === undefined || Number.isNaN(Number(payload.weightKg))) {
    errors.push("weightKg must be a number");
  }

  return errors;
}

module.exports = { validateProductPayload };
