import { OpenAPIPaths } from "redoc/typings/types";
import { DbPaymentSchema } from "../../models/payment";

export const PaymentsDocs: OpenAPIPaths = {
    "/payments": {
        post: {
            description: "store a payment",

            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: DbPaymentSchema,
                    },
                },
            },
            responses: {
                201: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "string",
                                format: "uuid",
                            },
                        },
                    },
                },
            },
        },
    },
};
