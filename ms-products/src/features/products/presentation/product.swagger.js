const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Products API",
    version: "1.0.0",
    description: "CRUD completo do dominio de produtos (MongoDB Atlas)"
  },
  servers: [
    {
      url: "http://localhost:4001",
      description: "Local development"
    }
  ],
  tags: [
    { name: "Health", description: "Health check do servico" },
    { name: "Products", description: "Operacoes CRUD de produtos" }
  ],
  components: {
    schemas: {
      ProductInput: {
        type: "object",
        required: ["name", "weightKg", "destination"],
        properties: {
          name: { type: "string", example: "Notebook Dell" },
          weightKg: { type: "number", format: "float", example: 2.5 },
          destination: { type: "string", example: "Curitiba - PR" }
        }
      },
      Product: {
        allOf: [
          { $ref: "#/components/schemas/ProductInput" },
          {
            type: "object",
            properties: {
              _id: {
                type: "string",
                example: "6632cf3a72f4d2f8e1094f01"
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          }
        ]
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "string", example: "Not found" }
        }
      }
    }
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Retorna status do servico",
        responses: {
          200: {
            description: "Servico operacional",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    service: { type: "string", example: "products" },
                    status: { type: "string", example: "ok" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/products": {
      get: {
        tags: ["Products"],
        summary: "Lista produtos",
        responses: {
          200: {
            description: "Lista de produtos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Product" }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ["Products"],
        summary: "Cria produto",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" }
            }
          }
        },
        responses: {
          201: {
            description: "Produto criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" }
              }
            }
          },
          400: {
            description: "Erro de validacao",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    },
    "/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Busca produto por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          200: {
            description: "Produto encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" }
              }
            }
          },
          404: {
            description: "Produto nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      put: {
        tags: ["Products"],
        summary: "Atualiza produto por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductInput" }
            }
          }
        },
        responses: {
          200: {
            description: "Produto atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" }
              }
            }
          },
          404: {
            description: "Produto nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Products"],
        summary: "Remove produto por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          204: { description: "Produto removido" },
          404: {
            description: "Produto nao encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = { swaggerSpec };
