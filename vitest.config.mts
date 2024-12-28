import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from "node:path";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        coverage: {
            provider: 'v8',
            include: ["src/**/**/*.ts"],
        },
        globals: true,
        environment: 'node',
        setupFiles: ['./vitest.setup.mts'],
        mockReset: true,
        clearMocks: true,
        restoreMocks: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
});