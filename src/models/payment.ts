import { Static, Type } from "@sinclair/typebox";
import { Currency } from "./currency";

export const PAYMENT_DYNAMO_TABLE = "payments";

export type Payment = Static<typeof DbPaymentSchema>;

export const DbPaymentSchema = Type.Object({
    payment_id: Type.String({ format: "uuid" }),
    user_id: Type.String({ format: "uuid" }),
    payment_date: Type.String({ format: "date-time" }),
    payment_description: Type.String(),
    payment_currency: Type.Enum(Currency),
    payment_amount: Type.Number(),
});
