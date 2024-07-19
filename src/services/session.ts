import { AsyncLocalStorage } from "node:async_hooks";

export const SessionService = new AsyncLocalStorage<{
    requestId?: string;
}>();
