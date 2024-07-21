import express from "express";
import { RequestLoggerMiddleware } from "./middleware/log-request";
import { ErrorHandlerMiddleware } from "./middleware/error-handler";
import { router } from "./router";
import { RequestTracerMiddleware } from "./middleware/request-id";

export const app = express();

app.use(express.json());
app.use(RequestLoggerMiddleware);
app.use(RequestTracerMiddleware);
app.use(router);
app.use(ErrorHandlerMiddleware);
