import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/**/*.{test,spec}.?(c|m)[jt]s'],
        coverage: {
            provider: 'istanbul',
            reporter: ['lcov'],
            include: ['src/**/*.{ts,tsx}'],
        },
    },
});
