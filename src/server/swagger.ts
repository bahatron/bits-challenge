import { OpenAPISpec } from "redoc/typings/types/open-api";
import { PaymentsDocs } from "../routes/payments/payments.docs";
import { PingDocs } from "../routes/ping/ping.docs";

export const swaggerFile: OpenAPISpec = {
    openapi: "3.0.0",
    info: {
        title: "Bits Challenge",
        description: "A sample app with ApiGateway, Lambda, DynamoDB and CDK",
        version: "0.1.0",
    },
    servers: [
        {
            url: "/",
        },
    ],
    paths: {
        ...PingDocs,
        ...PaymentsDocs,
    },
};
