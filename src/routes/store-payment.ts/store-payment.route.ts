import { RequestHandler } from "express";
import { DynamoClient } from "../../services/dynamo";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Logger } from "../../services/logger";
import {
    DbPaymentSchema,
    PAYMENT_DYNAMO_TABLE,
} from "../../dynamo-tables/payments";
import { Type } from "@sinclair/typebox";
import { JsonSchemaValidator } from "../../services/json-schema-validator";
import { HttpError } from "../../services/http-error";
import { AttributeType } from "@aws-cdk/aws-dynamodb";

export const StorePaymentRoute: RequestHandler = async (req, res) => {
    Logger.debug({
        data: req.body,
        valid: JsonSchemaValidator.validate(DbPaymentSchema, req.body),
    });

    if (!JsonSchemaValidator.validate(DbPaymentSchema, req.body)) {
        throw new HttpError(
            400,
            "ValidationFailed",
            JsonSchemaValidator.errors
        );
    }

    let data = {
        payment_id: { [AttributeType.STRING]: req.body.payment_id },
        user_id: { [AttributeType.STRING]: req.body.user_id },
        payment_date: { [AttributeType.STRING]: req.body.payment_date },
        payment_description: {
            [AttributeType.STRING]: req.body.payment_description,
        },
        payment_currency: { [AttributeType.STRING]: req.body.payment_currency },
        payment_amount: {
            [AttributeType.NUMBER]: req.body.payment_amount.toString(),
        },
    };

    await DynamoClient.send(
        new PutItemCommand({
            TableName: PAYMENT_DYNAMO_TABLE,
            Item: data,
        })
    );

    return res.status(201).json();
};
