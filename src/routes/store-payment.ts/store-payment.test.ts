import request from "supertest";
import { app } from "../../server";
import { randomUUID } from "crypto";
import { Currency } from "../../models/currency";
import { Payment, PAYMENT_DYNAMO_TABLE } from "../../models/payment";
import { DynamoClient, DynamoDocumentClient } from "../../services/dynamo";
import {
    DynamoDBClient,
    GetItemCommand,
    KeyType,
} from "@aws-sdk/client-dynamodb";

const SAMPLE_REQUEST: Payment = {
    user_id: randomUUID(),
    payment_id: randomUUID(),
    payment_date: new Date().toISOString(),
    payment_currency: Currency.GBP,
    payment_description: "Test payment",
    payment_amount: Math.random() * 15_000,
};

import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { AttributeType } from "@aws-cdk/aws-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

describe("Store Payment Endpoint", () => {
    beforeAll(async () => {
        await DynamoClient.send(
            new CreateTableCommand({
                TableName: PAYMENT_DYNAMO_TABLE,
                KeySchema: [
                    { AttributeName: "payment_id", KeyType: KeyType.HASH },
                ],
                AttributeDefinitions: [
                    {
                        AttributeName: "payment_id",
                        AttributeType: AttributeType.STRING,
                    },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 10,
                    WriteCapacityUnits: 10,
                },
            })
        ).catch((err) => {
            if (err.message.includes("Cannot create preexisting table")) {
                return;
            }

            throw err;
        });
    });

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
