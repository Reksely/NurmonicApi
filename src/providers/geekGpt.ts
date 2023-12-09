import axios from 'axios';
import fs from 'fs';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
import {getRandomProxy } from "../utils/getRandomProxy"
interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface Options {
  temperature?: number;
  presence_penalty?: number;
  top_p?: number;
  frequency_penalty?: number;
}

class GeekGpt {
  private static url = 'https://chat.geekgpt.org';
  private static working = true;
  private static supports_message_history = true;
  private static supports_stream = true;
  private static supports_gpt_35_turbo = true;
  private static supports_gpt_4 = true;

    public static async createCompletion(
    model: string | undefined,
    messages: Message[],
    stream: boolean,
    options?: Options
  ): Promise<string> {
    if (!model) {
      model = 'gpt-3.5-turbo';
    }

    const requestData = {
      messages,
      model,
      temperature: options?.temperature || 0.9,
      presence_penalty: options?.presence_penalty || 0,
      top_p: options?.top_p || 1,
      frequency_penalty: options?.frequency_penalty || 0,
      stream: true,
    };

    const randomProxy = getRandomProxy();

    const headers = {
      authority: 'ai.fakeopen.com',
      accept: '*/*',
      'accept-language': 'en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3',
      authorization: 'Bearer pk-this-is-a-real-free-pool-token-for-everyone',
      'content-type': 'application/json',
      origin: 'https://chat.geekgpt.org',
      referer: 'https://chat.geekgpt.org/',
      'sec-ch-ua': '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
      proxy: `socks5://${randomProxy}`,
    };

    let attempts = 0;
    let response: any = null;

    while (attempts < 30) {
      try {
        response = await axios.post('https://ai.fakeopen.com/v1/chat/completions', requestData, {
          headers,
          responseType: 'stream',
        });

        break;
      } catch (error) {
        attempts++;
        console.error(`Request failed. Attempt ${attempts} of 15.`);
        //await sleep(5000);
        if (attempts === 30) {
          console.error('All retry attempts failed. Returning "nothing".');
          return 'nothing';
        }
      }
    }


const data = await new Promise((resolve, reject) => {
  let data = '';
  response.data.on('data', (chunk) => {
    data += chunk;
  });
  response.data.on('end', () => {
    resolve(data);
  });
  response.data.on('error', (err) => {
    reject(err);
  });
});

    const regex = /{"delta":{"content":"([^"]+)"}/g;
    const contentArray = [];

    let match;
    while ((match = regex.exec(data))) {
      const content = match[1];
      contentArray.push(content);
    }

    let fullMessage = ``
    for (const contentValue of contentArray) {

      fullMessage += contentValue
    }
    return fullMessage;
  }
}

export default GeekGpt;
