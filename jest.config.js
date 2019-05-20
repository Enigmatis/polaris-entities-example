module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks : true,
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    testMatch: [
        // "**/tests/**/*.[jt]s?(x)",
        "**/*.test.ts"
    ],
};
