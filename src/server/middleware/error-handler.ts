import { ErrorRequestHandler } from "express";
import { SessionService } from "../../services/session";
import { Logger } from "../../services/logger";

export const ErrorHandlerMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    let code = isNaN(err.code) || err.code >= 600 ? 500 : parseInt(err.code);

    let requestId = SessionService.getStore()?.requestId;

    let context = {
        error: err,
        error_code: err.code,
        error_context: err.context,
        request_headers: req.headers,
        request_body: req.body,
        request_params: req.params,
        request_query: req.query,
    };

    if (code >= 500) {
        Logger.error(context, err.message);
    } else {
        Logger.warn(context, err.message);
    }

    return res.status(code).json({
        request_id: requestId,
        error: err,
    });
};
