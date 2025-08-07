// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    html: "<!DOCTYPE html><html><head></head><body></body></html>",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.env.js", "<rootDir>/jest.setup.ts"],
};
