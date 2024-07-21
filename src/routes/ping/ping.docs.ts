import { OpenAPIPaths } from "redoc/typings/types";

export const PingDocs: OpenAPIPaths = {
    "/ping": {
        get: {
            description: "ping",
            responses: {
                200: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "string",
                                enum: ["pong"],
                            },
                        },
                    },
                },
            },
        },
    },
};
