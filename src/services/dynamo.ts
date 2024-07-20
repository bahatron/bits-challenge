import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { EnvService } from "./env";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export const DynamoClient = new DynamoDBClient({
    region: EnvService.AWS_REGION,
    endpoint: EnvService.AWS_DYNAMO_ENDPOINT,
    credentials: {
        accessKeyId: EnvService.AWS_ACCESS_KEY,
        secretAccessKey: EnvService.AWS_SECRET_KEY,
    },
});

export const DynamoDocumentClient = DynamoDBDocumentClient.from(DynamoClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});
