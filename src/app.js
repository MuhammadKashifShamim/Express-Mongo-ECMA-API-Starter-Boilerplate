import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import xss from "xss-clean";
import logger from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import { connect } from "./config/db";
import { restRouter } from "./api";
import swaggerDocument from "./config/swagger.json";
import { configJWTStrategy } from "./api/middlewares/passport-jwt";
import { handleErrors } from "./api/middlewares/handle-errors";

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

connect();
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(passport.initialize()); // req.user
configJWTStrategy();
app.use("/api", restRouter);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

app.use(handleErrors);

export default app;
