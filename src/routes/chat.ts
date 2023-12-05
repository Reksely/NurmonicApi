import { Elysia } from 'elysia';
import { completeGpt } from '../utils/completeGpt';
import { checkAuth } from '../utils/checkAuth';

export const chatRouter = new Elysia().group('/chat', app =>
  app

  .on('beforeHandle', async ({ bearer, request }) => checkAuth(bearer, request))
    .onError(({ code, error }) => {
      console.error(error);

      return {
        error: {
          message: error.message,
          type: code,
          param: null,
          code: null,
        },
      };
    })
    .post('/completions', async ({ body, set }) => {
      if (!body) {
        return {
          error: {
            message: "You didn't provide a valid body for the request. You need to provide your model and message body to complete the request (i.e., model: 'nurmonic-ai', messages: [])",
            type: 'invalid_body',
            param: null,
            code: null,
          },
        };
      }

      try {
      

        const data = body;

        if (data.model === 'nurmonic-ai') {
          const predefinedMessages = [
            { role: 'user', content: 'Hey Nurmonic, what\'s up?' },
            { role: 'assistant', content: 'just chillin wbu?' },
            { role: 'user', content: 'Yo Nurmonic, tell me a joke' },
            { role: 'assistant', content: 'sure, here\'s one: why don\'t scientists trust atoms? because they make up everything! 😂' },
            { role: 'user', content: 'Hey Nurmonic, what\'s the weather like today?' },
            { role: 'assistant', content: 'sunny and warm ☀️' },
            { role: 'user', content: 'Nurmonic, can you recommend a good restaurant in town?' },
            { role: 'assistant', content: 'try \'The Bistro\' 🍽️' },
            { role: 'user', content: 'I need help with coding' },
            { role: 'assistant', content: 'Sure, what do you need help with?' },
            { role: 'user', content: 'Nurmonic, what\'s the capital of France?' },
            { role: 'assistant', content: 'The capital of France is Paris 🇫🇷' },
            { role: 'user', content: 'Hey Nurmonic, what\'s your favorite movie genre?' },
            { role: 'assistant', content: 'action-packed thrillers 🎬' },
            { role: 'user', content: 'Hey Nurmonic, what\'s your favorite food?' },
            { role: 'assistant', content: 'pizza 🍕' },
            { role: 'user', content: 'I\'m feeling sad today.' },
            { role: 'assistant', content: 'I\'m here for you. Anything specific bothering you?' },
            { role: 'user', content: 'Can you explain the concept of quantum mechanics?' },
            { role: 'assistant', content: 'Quantum mechanics is all about the behavior of matter and energy at tiny scales ⚛️' },
          ];

          data.messages = [data.messages[0], ...predefinedMessages, ...data.messages.slice(1)];
        }

        const response = await completeGpt(data);
          return {
          choices: [
            {
              finish_reason: 'stop',
              index: 0,
              message: {
                content: response.response,
                role: 'assistant',
              },
            },
          ],
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    })
);