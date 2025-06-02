module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1", // Supports `@/components/...` alias
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
