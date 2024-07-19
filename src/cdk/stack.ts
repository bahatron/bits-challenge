import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class BitsChallengeStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // todo
    }
}
