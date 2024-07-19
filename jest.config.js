module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules"],
    coveragePathIgnorePatterns: ["./dist/**/*"],
    workerIdleMemoryLimit: "512MB",
};
