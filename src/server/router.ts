import { Router } from "express";
import { PingRoute } from "../routes/ping/ping.route";
import { StorePaymentRoute } from "../routes/store-payment.ts/store-payment.route";

export const router = Router();

router.get("/ping", PingRoute);
router.post("/payments", StorePaymentRoute);
