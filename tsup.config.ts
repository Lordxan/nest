import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: false,
  sourcemap: false,
  outDir: 'packages',
  clean: false,
  entryPoints: [
    'packages/common/index.ts',
    'packages/core/index.ts',
    'packages/microservices/index.ts',
    'packages/platform-express/index.ts',
    'packages/platform-fastify/index.ts',
    'packages/platform-socket.io/index.ts',
    'packages/platform-ws/index.ts',
    'packages/testing/index.ts',
    'packages/websockets/index.ts'
  ],
});
