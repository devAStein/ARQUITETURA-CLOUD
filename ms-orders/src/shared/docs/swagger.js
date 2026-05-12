const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: "Orders API", version: "1.0.0" }
  },
  apis: []
});

module.exports = { swaggerSpec };
