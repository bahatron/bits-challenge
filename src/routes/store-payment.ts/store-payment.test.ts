import request from "supertest";
import { app } from "../../server";
import { randomUUID } from "crypto";
import { Logger } from "../../services/logger";
import { Payment } from "../../dynamo-tables/payments";
import { Currency } from "../../types/currency";

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
});
