#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BitsChallengeStack } from "./stack";
import { EnvService } from "../services/env";

const bitsStack = new cdk.App();
new BitsChallengeStack(bitsStack, "BitsChallengeStack", {
    env: {
        account: "000000000000",
        region: EnvService.AWS_REGION,
    },
});
