import {
    CreateTableCommand,
    CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";
import { DynamoClient } from "../services/dynamo";
import { DynamoPaymentTableConfig } from "./payments";

const tables: CreateTableCommandInput[] = [DynamoPaymentTableConfig];

export async function setupTables() {
    for (let table of tables) {
        await DynamoClient.send(new CreateTableCommand(table)).catch((err) => {
            if (err.message.includes("Cannot create preexisting table")) {
                return;
            }

            throw err;
        });
    }
}
