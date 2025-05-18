// Required Modules
const fs = require("fs");
require("dotenv").config();
const { productSchema } = require("../schemas/product.schema"); // Assuming this is a Joi schema
const j2s = require("joi-to-swagger"); // Converts Joi schema to Swagger schema
const swaggerJSDoc = require("swagger-jsdoc");

// Convert Joi schema to Swagger-compatible schema
const { swagger: productSwaggerSchema } = j2s(productSchema);

// Get base URL from .env
const baseUrl = process.env.baseUrl || "http://localhost:3000"; // fallback in case .env is missing

// OpenAPI Specification
const openApiDocument = {
  openapi: "3.0.0",
  info: {
    title: "Ecommerce Application API",
    version: "1.0.0",
    description: "CRUD API for managing products",
  },
  servers: [
    {
      url: baseUrl,
    },
  ],
  paths: {
    "/api/products": {
      get: {
        summary: "Get all products",
        responses: {
          200: {
            description: "List of products",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/product" }, // ✅ FIXED: previously referenced 'products', which doesn't exist
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Add new product",
        requestBody: {
          // ✅ FIXED: typo 'requstBody' to 'requestBody'
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/product" }, // ✅ FIXED: updated to match actual schema name
            },
          },
        },
        responses: {
          201: {
            description: "product Created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/product", // ✅ FIXED: Removed invalid array structure
                },
              },
            },
          },
          400: {
            description: "Validation failed",
          },
        },
      },
    },
    "/api/products/{id}": {
      // ✅ FIXED: ':id' changed to '{id}' per OpenAPI path param syntax
      get: {
        summary: "Get product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Product retrieved" },
          400: { description: "Validation error" },
        },
      },
      put: {
        summary: "Update product by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Product updated" },
          400: { description: "Validation error" },
        },
      },
      delete: {
        summary: "Delete a product",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Product deleted" },
        },
      },
    },
  },
  components: {
    schemas: {
      product: productSwaggerSchema, // ✅ FIXED: this is the actual schema name you're referencing
    },
  },
};

// Create Swagger spec with options
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: openApiDocument,
  apis: [], // You can add ['./routes/*.js'] if using @swagger JSDoc annotations
});

// Output to a JSON file
fs.writeFileSync("./swagger.json", JSON.stringify(swaggerSpec, null, 2));

module.exports = openApiDocument;
