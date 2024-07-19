import { Router } from "express";
import { PingRoute } from "../routes/ping/ping.route";

export const router = Router();

router.get("/ping", PingRoute);
