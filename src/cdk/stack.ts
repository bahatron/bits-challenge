import {
    IResource,
    LambdaIntegration,
    MockIntegration,
    PassthroughBehavior,
    RestApi,
} from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as iam from "aws-cdk-lib/aws-iam";
// import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as cdk from "aws-cdk-lib";
import {
    NodejsFunction,
    NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { PAYMENT_DYNAMO_TABLE } from "../models/payment";
import { resolve } from "path";
import { EnvService } from "../services/env";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export class BitsChallengeStack extends cdk.Stack {
    constructor(app: cdk.App, id: string, props?: cdk.StackProps) {
        super(app, id);

        const paymentTable = new dynamodb.Table(this, PAYMENT_DYNAMO_TABLE, {
            tableName: PAYMENT_DYNAMO_TABLE,
            partitionKey: {
                name: "payment_id",
                type: dynamodb.AttributeType.STRING,
            },
            resourcePolicy: new iam.PolicyDocument({
                statements: [
                    new iam.PolicyStatement({
                        actions: ["dynamodb:*"],
                    }),
                ],
            }),
        });

        // const nodeJsFunctionProps: NodejsFunctionProps = {
        //     // bundling: {
        //     //     externalModules: ["aws-sdk"],
        //     // },
        //     // depsLockFilePath: resolve(process.cwd(), "./package-lock.json"),
        //     environment: EnvService,
        //     runtime: Runtime.NODEJS_20_X,
        // };

        // const serveApiLambda = new NodejsFunction(this, "getOneItemFunction", {
        //     entry: resolve(process.cwd(), "src/lambdas/index.ts"),
        //     ...nodeJsFunctionProps,
        // });

        // paymentTable.grantReadWriteData(serveApiLambda);

        // const serveApiIntegration = new LambdaIntegration(serveApiLambda);

        // const api = new RestApi(this, "apiGateway", {
        //     restApiName: "apiGateway",
        // });

        // const rootResource = api.root.addResource("/");

        // rootResource.addMethod("GET", serveApiIntegration);
        // rootResource.addMethod("POST", serveApiIntegration);
        // rootResource.addMethod("PUT", serveApiIntegration);
        // rootResource.addMethod("DELETE", serveApiIntegration);
    }
}
