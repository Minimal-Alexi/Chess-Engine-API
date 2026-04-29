module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalTeardown: "./tests/teardown.ts",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  clearMocks: true
};