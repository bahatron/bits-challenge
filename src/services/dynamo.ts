import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { EnvService } from "./env";

export const DynamoClient = new DynamoDBClient({
    region: EnvService.AWS_REGION,
    endpoint: EnvService.AWS_DYNAMO_ENDPOINT,
    credentials: {
        accessKeyId: EnvService.AWS_ACCESS_KEY,
        secretAccessKey: EnvService.AWS_SECRET_KEY,
    },
});
