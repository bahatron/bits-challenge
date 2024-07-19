import { AttributeType } from "@aws-cdk/aws-dynamodb";
import { Static, Type } from "@sinclair/typebox";
import { Currency } from "../types/currency";
import { KeyType } from "@aws-sdk/client-dynamodb";

export type Payment = Static<typeof DbPaymentSchema>;
export const DbPaymentSchema = Type.Object({
    payment_id: Type.String({ format: "uuid" }),
    user_id: Type.String({ format: "uuid" }),
    payment_date: Type.String({ format: "date-time" }),
    payment_description: Type.String(),
    payment_currency: Type.Enum(Currency),
    payment_amount: Type.Number(),
});

export const PAYMENT_DYNAMO_TABLE = "payments";

export const DynamoPaymentTableConfig = {
    TableName: PAYMENT_DYNAMO_TABLE,
    KeySchema: [{ AttributeName: "payment_id", KeyType: KeyType.HASH }],
    AttributeDefinitions: [
        { AttributeName: "payment_id", AttributeType: AttributeType.STRING },
        // { AttributeName: "user_id", AttributeType: AttributeType.STRING },
        // { AttributeName: "payment_date", AttributeType: AttributeType.STRING },
        // {
        //     AttributeName: "payment_description",
        //     AttributeType: AttributeType.STRING,
        // },
        // {
        //     AttributeName: "payment_currency",
        //     AttributeType: AttributeType.STRING,
        // },
        // {
        //     AttributeName: "payment_amount",
        //     AttributeType: AttributeType.NUMBER,
        // },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    },
};
