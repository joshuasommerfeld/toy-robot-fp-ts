import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    roots: ["<rootDir>/src"],
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
};

export default config;
