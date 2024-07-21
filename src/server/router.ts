import { Router } from "express";
import { PingRoute } from "../routes/ping/ping.route";
import { StorePaymentRoute } from "../routes/payments/store-payment/store-payment.route";
import { swaggerFile } from "./swagger";
import redoc from "redoc-express";

export const router = Router();

// swagger routes
router.get("/docs/swagger.json", (req, res) => res.json(swaggerFile));
router.get(
    "/docs",
    redoc({
        title: "Bits Challenge",
        specUrl: "/docs/swagger.json",
    })
);

// app routes
router.get("/ping", PingRoute);
router.post("/payments", StorePaymentRoute);
