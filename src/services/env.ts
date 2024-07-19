function mandatory(name: string) {
    const envVar = process.env[name];
    if (envVar === undefined) {
        throw new Error(`Environment Variable ${name} is not set`);
    }
    return envVar;
}

export const EnvService = {
    PORT: mandatory("PORT"),
    AWS_REGION: mandatory("AWS_REGION"),
    AWS_DYNAMO_ENDPOINT: mandatory("AWS_DYNAMO_ENDPOINT"),
    AWS_ACCESS_KEY: mandatory("AWS_ACCESS_KEY"),
    AWS_SECRET_KEY: mandatory("AWS_SECRET_KEY"),
};
