const { Router } = require("express");
const { getAggregatedData } = require("./aggregation.controller");

const aggregationRoutes = Router();

aggregationRoutes.get("/aggregated-data", getAggregatedData);

module.exports = { aggregationRoutes };
