import { Elysia } from 'elysia';

import { chatRouter } from './routes/chat';
import { infoRouter } from './routes/info';
import { bearer } from '@elysiajs/bearer'

export const app = new Elysia()
  .use(bearer())
  .get('/', () => 'Welcome to Nurmonic API')
  .use(chatRouter)
  .use(infoRouter)
  .listen({
        port: 95,
        hostname: '0.0.0.0'
    })




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
