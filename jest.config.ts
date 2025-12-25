import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["ts", "js", "json"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(
            {
                "@/*": ["*"],
            },
            {
                prefix: "<rootDir>/src/",
            },
        ),
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    testRegex: ".*\\.spec\\.ts$",
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/**/*.d.ts"],
    coverageDirectory: "./coverage",
    roots: ["<rootDir>/src"],
};

export default config;
