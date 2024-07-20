import {
    IResource,
    LambdaIntegration,
    MockIntegration,
    PassthroughBehavior,
    RestApi,
} from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import {
    NodejsFunction,
    NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";
import { PAYMENT_DYNAMO_TABLE } from "../models/payment";

export class BitsChallengeStack extends cdk.Stack {
    constructor(app: cdk.App, id: string, props?: cdk.StackProps) {
        super(app, id);

        const paymentTable = new dynamodb.Table(this, PAYMENT_DYNAMO_TABLE, {
            tableName: PAYMENT_DYNAMO_TABLE,
            partitionKey: {
                name: "payment_id",
                type: dynamodb.AttributeType.STRING,
            },
        });

        // const nodeJsFunctionProps: NodejsFunctionProps = {
        //     bundling: {
        //         externalModules: [
        //             "aws-sdk", // Use the 'aws-sdk' available in the Lambda runtime
        //         ],
        //     },
        //     depsLockFilePath: join(__dirname, "lambdas", "package-lock.json"),
        //     environment: {
        //         PRIMARY_KEY: "itemId",
        //         TABLE_NAME: paymentTable.tableName,
        //     },
        //     runtime: Runtime.NODEJS_20_X,
        // };

        // // Create a Lambda function for each of the CRUD operations
        // const getOneLambda = new NodejsFunction(this, "getOneItemFunction", {
        //     entry: join(__dirname, "lambdas", "get-one.ts"),
        //     ...nodeJsFunctionProps,
        // });

        // const getAllLambda = new NodejsFunction(this, "getAllItemsFunction", {
        //     entry: join(__dirname, "lambdas", "get-all.ts"),
        //     ...nodeJsFunctionProps,
        // });

        // const createOneLambda = new NodejsFunction(this, "createItemFunction", {
        //     entry: join(__dirname, "lambdas", "create.ts"),
        //     ...nodeJsFunctionProps,
        // });
        // const updateOneLambda = new NodejsFunction(this, "updateItemFunction", {
        //     entry: join(__dirname, "lambdas", "update-one.ts"),
        //     ...nodeJsFunctionProps,
        // });
        // const deleteOneLambda = new NodejsFunction(this, "deleteItemFunction", {
        //     entry: join(__dirname, "lambdas", "delete-one.ts"),
        //     ...nodeJsFunctionProps,
        // });

        // // Grant the Lambda function read access to the DynamoDB table
        // paymentTable.grantReadWriteData(getAllLambda);
        // paymentTable.grantReadWriteData(getOneLambda);
        // paymentTable.grantReadWriteData(createOneLambda);
        // paymentTable.grantReadWriteData(updateOneLambda);
        // paymentTable.grantReadWriteData(deleteOneLambda);

        // // Integrate the Lambda functions with the API Gateway resource
        // const getAllIntegration = new LambdaIntegration(getAllLambda);
        // const createOneIntegration = new LambdaIntegration(createOneLambda);
        // const getOneIntegration = new LambdaIntegration(getOneLambda);
        // const updateOneIntegration = new LambdaIntegration(updateOneLambda);
        // const deleteOneIntegration = new LambdaIntegration(deleteOneLambda);

        // // Create an API Gateway resource for each of the CRUD operations
        // const api = new RestApi(this, "itemsApi", {
        //     restApiName: "Items Service",
        //     // In case you want to manage binary types, uncomment the following
        //     // binaryMediaTypes: ["*/*"],
        // });

        // const items = api.root.addResource("items");
        // items.addMethod("GET", getAllIntegration);
        // items.addMethod("POST", createOneIntegration);
        // addCorsOptions(items);

        // const singleItem = items.addResource("{id}");
        // singleItem.addMethod("GET", getOneIntegration);
        // singleItem.addMethod("PATCH", updateOneIntegration);
        // singleItem.addMethod("DELETE", deleteOneIntegration);
        // addCorsOptions(singleItem);
    }
}

export function addCorsOptions(apiResource: IResource) {
    apiResource.addMethod(
        "OPTIONS",
        new MockIntegration({
            // In case you want to use binary media types, uncomment the following line
            // contentHandling: ContentHandling.CONVERT_TO_TEXT,
            integrationResponses: [
                {
                    statusCode: "200",
                    responseParameters: {
                        "method.response.header.Access-Control-Allow-Headers":
                            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                        "method.response.header.Access-Control-Allow-Origin":
                            "'*'",
                        "method.response.header.Access-Control-Allow-Credentials":
                            "'false'",
                        "method.response.header.Access-Control-Allow-Methods":
                            "'OPTIONS,GET,PUT,POST,DELETE'",
                    },
                },
            ],
            // In case you want to use binary media types, comment out the following line
            passthroughBehavior: PassthroughBehavior.NEVER,
            requestTemplates: {
                "application/json": '{"statusCode": 200}',
            },
        }),
        {
            methodResponses: [
                {
                    statusCode: "200",
                    responseParameters: {
                        "method.response.header.Access-Control-Allow-Headers":
                            true,
                        "method.response.header.Access-Control-Allow-Methods":
                            true,
                        "method.response.header.Access-Control-Allow-Credentials":
                            true,
                        "method.response.header.Access-Control-Allow-Origin":
                            true,
                    },
                },
            ],
        }
    );
}
