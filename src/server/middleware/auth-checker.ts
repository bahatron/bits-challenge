import { RequestHandler } from "express";

export const CheckAuthMiddleware: (permissions?: string[]) => RequestHandler = (
    permissions
) => {
    return async (req, res, next) => {
        // simulate auth check
        await new Promise((resolve) => setTimeout(resolve, 50));

        return next();
    };
};
