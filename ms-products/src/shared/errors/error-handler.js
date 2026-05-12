function errorHandler(error, _req, res, _next) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Invalid product id" });
  }

  return res.status(500).json({ error: "Internal server error" });
}

module.exports = { errorHandler };
