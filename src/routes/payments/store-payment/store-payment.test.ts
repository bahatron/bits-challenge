import request from "supertest";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { Payment, PAYMENT_DYNAMO_TABLE } from "../../../models/payment";
import { randomUUID } from "crypto";
import { Currency } from "../../../models/currency";
import { DynamoDocumentClient } from "../../../services/dynamo";
import { app } from "../../../server";

const SAMPLE_REQUEST: Payment = {
    user_id: randomUUID(),
    payment_id: randomUUID(),
    payment_date: new Date().toISOString(),
    payment_currency: Currency.GBP,
    payment_description: "Test payment",
    payment_amount: Math.random() * 15_000,
};

describe("Store Payment Endpoint", () => {
    it("returns http 201", async () => {
        await request(app).post("/payments").send(SAMPLE_REQUEST).expect(201);
    });

    it("stores the payment on dynamo", async () => {
        const result = await DynamoDocumentClient.send(
            new GetCommand({
                TableName: PAYMENT_DYNAMO_TABLE,
                Key: {
                    payment_id: SAMPLE_REQUEST.payment_id,
                },
            })
        );

        expect(result.Item).toBeTruthy();
        expect(result.Item).toEqual(SAMPLE_REQUEST);
    });
});
