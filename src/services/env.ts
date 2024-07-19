function mandatory(name: string) {
    const envVar = process.env[name];
    if (envVar === undefined) {
        throw new Error(`Environment Variable ${name} is not set`);
    }
    return envVar;
}

export const EnvService = {
    PORT: process.env.PORT,
};
