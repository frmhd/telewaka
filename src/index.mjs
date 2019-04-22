import TelegramBot from 'node-telegram-bot-api';
import {
  ifElse, identity, equals, always,
} from 'ramda';
import { wakaFetchInit } from './axios';

/** telegram bot token */
const TOKEN = '';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', ({ chat, text }) => {
  const { id: chatId } = chat;

  const isStartCommand = equals(text, '/start');
  const onStart = () => {
    bot.sendMessage(chatId, 'YO');
    bot.sendMessage(chatId, 'take it here https://wakatime.com/settings/api-key');
    bot.on('message', async (msg) => {
      const wakaApiKey = Buffer.from(msg.text).toString('base64');
      const wakaFetch = wakaFetchInit(wakaApiKey);

      const { data: testDataFromWaka } = await wakaFetch.get('users/current/projects');
      const askKeyForJira = () => bot.sendMessage(chatId, 'GIvE me your JIRA login and password');
      const sayBullshit = () => {
        bot.sendMessage(chatId, 'that bullshit api key');
        return onStart();
      };

      ifElse(identity, askKeyForJira, sayBullshit)(testDataFromWaka);
    });
  };

  // WTF
  ifElse(identity, onStart, always(null))(isStartCommand);
});
