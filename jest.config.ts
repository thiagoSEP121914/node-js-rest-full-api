import type { JestConfigWithTsJest } from "ts-jest";
import { pathsToModuleNameMapper } from "ts-jest";

const config: JestConfigWithTsJest = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleFileExtensions: ["ts", "js", "json"],

    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
        ...pathsToModuleNameMapper({ "@/*": ["src/*"] }, { prefix: "<rootDir>/" }),
    },

    transform: {
        "^.+\\.ts$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    module: "ESNext",
                },
            },
        ],
        // 👇 ADICIONADO: transformar .js também
        "^.+\\.js$": [
            "ts-jest",
            {
                useESM: true,
                tsconfig: {
                    module: "ESNext",
                },
            },
        ],
    },

    transformIgnorePatterns: ["node_modules/(?!@faker-js)"],

    testRegex: ".*\\.spec\\.ts$",
    collectCoverageFrom: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/**/*.d.ts"],
    coverageDirectory: "./coverage",
    roots: ["<rootDir>/src", "<rootDir>/tests"],
};

export default config;
