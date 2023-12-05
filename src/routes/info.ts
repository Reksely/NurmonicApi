import { Elysia } from 'elysia';



export const infoRouter = new Elysia().group('/api', app =>
  app
    .onError(({ code, error }) => {
      console.error(error);

      return {
        code,
        message: error.message,
      };
    })
    .get(
      '/models',
      async ({}) => {
        return "bye"
      }

    )
);