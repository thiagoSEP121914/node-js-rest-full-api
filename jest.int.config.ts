export default {
    moduleFileExtensions: ["ts", "js", "json"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1", // Mapeia @/* manualmente
    },
    testRegex: ".*\\.int-spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: ["node_modules/(?!@faker-js)"],
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    rootDir: ".",
};
