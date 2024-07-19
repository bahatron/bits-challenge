import { AttributeType } from "@aws-cdk/aws-dynamodb";
import { Static, Type } from "@sinclair/typebox";
import { KeyType } from "@aws-sdk/client-dynamodb";

export type CreditReport = Static<typeof DbCreditReportSchema>;
export const DbCreditReportSchema = Type.Object({
    user_id: Type.String({ format: "uuid" }),
    date_start: Type.String({ format: "date-time" }),
    date_end: Type.String({ format: "date-time" }),
});

export const DynamoPaymentTableConfig = {
    TableName: "payments",
    KeySchema: [{ AttributeName: "payment_id", KeyType: KeyType.HASH }],
    AttributeDefinitions: [
        { AttributeName: "user_id", AttributeType: AttributeType.STRING },
        { AttributeName: "date_start", AttributeType: AttributeType.STRING },
        { AttributeName: "date_end", AttributeType: AttributeType.STRING },
    ],
};
