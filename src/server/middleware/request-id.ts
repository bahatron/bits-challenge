import { randomUUID } from "crypto";
import { RequestHandler } from "express";
import { SessionService } from "../../services/session";

export const RequestTracerMiddleware: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        let requestId = (req.headers["x-request-id"] || randomUUID()) as string;

        SessionService.run({ requestId }, next);
    } catch (err) {
        return next(err);
    }
};
