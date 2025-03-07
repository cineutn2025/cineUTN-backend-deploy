import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"], // Asegura que Jest solo busque en `src`
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {}],
  },
  testMatch: [
    "**/tests/unit/**/*.test.ts"  // Solo archivos .test.ts dentro de tests/unit/
  ]
};

export default config;
