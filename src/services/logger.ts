import pino from "pino";
import { SessionService } from "./session";

export const Logger = pino({
    mixin: () => {
        return {
            requestId: SessionService.getStore()?.requestId,
        };
    },
});
