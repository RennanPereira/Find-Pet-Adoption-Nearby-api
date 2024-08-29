import { defineConfig } from 'Vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        environmentMatchGlobs: [['src/http/controllers/**', '/vitest-environment/prisma.ts']],

    }
})