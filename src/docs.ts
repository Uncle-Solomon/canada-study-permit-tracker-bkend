import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

// Swagger configuration options
const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Canada Study Permit Tracker API Documentation",
      version: "1.0.0",
      description:
        "The API documentation for Canada Study Permit Tracker, developed by Ameh Solomon Onyeke (A.S.O)",
    },
  },

  apis: [path.resolve(__dirname, "./routes/**/*.ts")],
};
export const swaggerSpec = swaggerJSDoc(options);
