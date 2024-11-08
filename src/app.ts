import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { swaggerSpec } from "./docs";
import { authRoute } from "./routes/auth";
import { caseRoute } from "./routes/case";

// Create express app instance
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(
  helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cases", caseRoute);

//Server Landing Page
app.get("/", (req: Request, res: Response) => {
  res.send(
    "The API for Canada Study Permit Tracker, developed by Ameh Solomon Onyeke (A.S.O)"
  );
});

export default app;
